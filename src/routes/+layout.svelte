<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { firebaseAuth } from '$lib/firebase/firebase.app';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
  import type { PageData } from './$types';

  onMount(() => {
    firebaseAuth?.onIdTokenChanged(async (user) => {
      // send the token to the server
      if (user) {
        const token = await user?.getIdToken();
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ token: token })
        });
      }
    });
    firebaseAuth?.onAuthStateChanged(async (user) => {
      console.log(user);
    });
  });

  export let data: PageData;
</script>

<QueryClientProvider client={data.queryClient}>
  <div class="app">
    <main>
      <slot />
    </main>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
