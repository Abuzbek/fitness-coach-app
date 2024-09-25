<script lang="ts">
	export let data;
	$: ({ users } = data);
</script>

<h1>Welcome to Supabase!</h1>
<!-- <ul>
	{#each users as user}
		<li>{user.full_name}</li>
		<li>{user.email}</li>
	{/each}
</ul> -->