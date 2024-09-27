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
    const user_health_detail = formData.get('user_health_detail') as string;
    const { data, error } = await supabase.auth.signUp({ email, password });
    const { age, weight, height, gender, goal, body_type } = JSON.parse(user_health_detail);

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ user_id: data.user?.id, full_name: name, email}])
      .select();
    const { error: userDataError } = await supabase
      .from('user_data')
      .insert([{ user_id: userData?.[0].id, age, weight, height, gender, goal, body_type }])
      .select();
    console.log(userData);
    if (error || userError || userDataError) {
      console.error(error, userError, userDataError);
      redirect(303, '/auth/error');
    } else {
      redirect(303, '/');
    }
  }
};
