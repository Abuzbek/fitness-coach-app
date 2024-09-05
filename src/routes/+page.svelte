<script lang="ts">
  import { firebaseDB } from "$lib/firebase/firebase.app";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { collection, getDocs, QuerySnapshot, type DocumentData } from "firebase/firestore";
  import { onMount } from "svelte";
  import { Collection, SignedIn, SignedOut } from "sveltefire";

  let users: Promise<QuerySnapshot<DocumentData, DocumentData>>;

  onMount(async ()=> {
    users = getDocs(collection(firebaseDB, 'users'));
  })
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <Loader data={users} let:data={users}>
  {#if users && users?.size}
    {#each users.docs as user}
      <p>{user.get('name')}</p>
      <p>{user.get('age')}</p>
    {/each}
  {/if}
</Loader> -->

<SignedIn let:user let:signOut>
  <p>Hello {user.uid}</p>
  <button on:click={signOut}>Sign Out</button>
  <Collection ref="users" let:data={users}>
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
