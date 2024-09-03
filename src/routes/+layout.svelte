<script lang="ts">
  import '../app.css';
  import { FirebaseApp } from 'sveltefire';

  // let auth = firebaseAuth;
  // let firestore = firebaseDB;
</script>

<!-- <FirebaseApp {auth} {firestore}> -->
  <slot />
<!-- </FirebaseApp> -->

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
