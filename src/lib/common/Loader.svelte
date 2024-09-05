<script lang="ts">
    export let data: Promise<any>;
</script>

{#await data}
	<p>...waiting</p>
{:then data}
  <slot {data}/>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}