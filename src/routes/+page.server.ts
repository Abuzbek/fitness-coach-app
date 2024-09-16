import { supabase } from '$lib/supabase/client';
const get_user_with_auth = `
      SELECT auth_users.id AS auth_user_id, auth_users.email, public_users.full_name
      FROM auth.users AS auth_users
      JOIN public.users AS public_users
      ON auth_users.id = public_users.user_id;
    `;
export async function load() {
  const { data } = await supabase.rpc('execute_sql', {
    query: get_user_with_auth
  });
  return {
    users: data ?? []
  };
}
