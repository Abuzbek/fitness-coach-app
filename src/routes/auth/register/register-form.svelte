<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema } from './schema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';

  export let user_health_detail: string;

  let showPassword = false;

  const data = $page.data.form;
  
  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const form = superForm(data, {
    validators: zodClient(formSchema)
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="?/register" class="space-y-4">
  <Form.Field {form} name="user_health_detail" class="space-y-2">
    <Form.Control let:attrs>
      <Input {...attrs} type="hidden" value={user_health_detail} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="name" class="space-y-2">
    <Form.Control let:attrs>
      <Form.Label>Full name</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="email" class="space-y-2">
    <Form.Control let:attrs>
      <Form.Label>E-mail</Form.Label>
      <Input {...attrs} type="email" bind:value={$formData.email} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password" class="space-y-2">
    <Form.Control let:attrs>
      <Form.Label>Password</Form.Label>
      <div class="relative">
        <Input
          {...attrs}
          type={showPassword ? 'text' : 'password'}
          bind:value={$formData.password}
        />
        <button
          type="button"
          on:click={togglePasswordVisibility}
          class="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Icon icon={showPassword ? 'heroicons-outline:eye-off' : 'heroicons-outline:eye'} />
        </button>
      </div>
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <div class="flex justify-between items-center">
    <a href="/forgot-password" class="text-sm text-blue-500 hover:underline">
      Forgot your password?
    </a>
  </div>
  <Form.Button class="w-full">Login</Form.Button>
</form>
<!-- <h2 class="text-2xl font-bold text-center mb-8">Create your account</h2> -->

<p class="text-center mt-4">
  Already have an account?
  <a class="text-blue-500 hover:underline" href="/auth/login"> Log in </a>
</p>
