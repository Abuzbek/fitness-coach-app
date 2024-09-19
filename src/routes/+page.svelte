<script>
	export let data;
	$: ({ users } = data);
</script>

<h1>Welcome to Supabase!</h1>
<ul>
	{#each users as user}
		<li>{user.name}</li>
	{/each}
</ul>