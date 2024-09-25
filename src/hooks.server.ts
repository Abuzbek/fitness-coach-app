import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PrismaClient } from '@prisma/client';
import { createServerClient } from '@supabase/ssr';
import { type Handle , type RequestEvent, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const PROTECTED_ROUTES = ['/private'];

const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Creates a Supabase client specific to this server request.
   *
   * The Supabase client gets the Auth token from the request cookies.
   */
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      // JWT validation has failed
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  if (!event.locals.session && isProtectedRoute(event) && !event.locals.user) {
    redirect(303, '/auth/login');
  }

  if (event.locals.session && event.url.pathname === '/auth') {
    redirect(303, '/private');
  }

  return resolve(event);
};

// const user: Handle = async ({ event, resolve }) => {
//   const token = event.cookies.get('jwt');

//   if (token) {
//     try {
//       const user = jwt.verify(token, SECRET_KEY) as JwtPayload;
//       event.locals.public_user = user;
//     } catch {
//       event.locals.public_user = null;
//     }
//   } else {
//     event.locals.user = null;
//   }

//   if (isProtectedRoute(event) && !event.locals.user) {
//     // Redirect unauthenticated users to the login page
//     throw redirect(302, '/auth/login');
//   }

//   return await resolve(event);
// };

const prisma: Handle = async ({ event, resolve }) => {
  const prisma = new PrismaClient();

  event.locals.prisma = prisma;

  return await resolve(event);
};

function isProtectedRoute(event: RequestEvent): boolean {
  return PROTECTED_ROUTES.some((route) => event.url.pathname.startsWith(route));
}

export const handle: Handle = sequence(supabase, authGuard, prisma);
