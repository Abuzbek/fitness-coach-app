<script lang="ts">
    export let data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<pre>{JSON.stringify(data,  null, 2)}</pre>
<style>
</style>
