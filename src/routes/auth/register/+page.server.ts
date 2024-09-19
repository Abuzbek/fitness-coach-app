import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

export const actions: Actions = {
  register: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log(data.user?.id);

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ user_id: data.user?.id, full_name: name, email, password_hash: password }])
      .select();
    console.log(userData);
    if (error || userError) {
      console.error(error, userError);
      redirect(303, '/auth/error');
    } else {
      redirect(303, '/');
    }
  }
};
