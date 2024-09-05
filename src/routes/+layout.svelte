<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { FirebaseApp } from 'sveltefire';
  import { firebaseAuth, firebaseDB } from '$lib/firebase/firebase.app';
  import type { Firestore } from 'firebase/firestore';
  import type { Auth } from 'firebase/auth';

  let auth: Auth|undefined;
  let firestore: Firestore|undefined;

  onMount(()=> {
    auth = firebaseAuth;
    firestore = firebaseDB;
  })
</script>

<FirebaseApp {auth} {firestore}>
  <slot />
</FirebaseApp>

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
