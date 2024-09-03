<script lang="ts">
  import { SignedIn, SignedOut, Doc, Collection } from 'sveltefire';
  import { signInWithEmailAndPassword } from "firebase/auth";

  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<SignedIn let:user let:signOut>
  <p>Hello {user.uid}</p>
  <button on:click={signOut}>Sign Out</button>
  <Collection startWith={data.users} ref="users" let:data={users}>
    {#each users as user}
        <h2>{user.name}</h2>
        <p>{user.age}</p>
    {/each}
  </Collection>
</SignedIn>

<SignedOut let:auth>
  <button on:click={() => signInWithEmailAndPassword(auth, 'abuzcoder@gmail.com', 'Mannon_2710')}>Sign In</button>
</SignedOut>

<style>
</style>
