<script lang="ts">
  import UserHealthDetail, { type ISteps } from '$lib/components/user-health-detail.svelte';
  import type { PageData } from './$types';
  import LoginForm from './login-form.svelte';

  export let data: PageData;
  $: ({ form } = data);

  const steps: ISteps[] = [
    {
      title: 'Log in to your account',
      disabledNext: false
    }
  ];
</script>

<UserHealthDetail {steps}>
  <svelte:fragment slot="body">
    <LoginForm data={form} />
  </svelte:fragment>
</UserHealthDetail>
