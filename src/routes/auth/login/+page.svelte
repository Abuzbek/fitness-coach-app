<script lang="ts">
  import type { PageData } from "./$types";
  import LoginForm from "./login-form.svelte";

  export let data: PageData;
  $: ({form} = data)
</script>
<LoginForm data={form}/>
