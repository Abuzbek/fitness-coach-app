import { redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms';
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from './schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const {error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/private')
    }
  },
}