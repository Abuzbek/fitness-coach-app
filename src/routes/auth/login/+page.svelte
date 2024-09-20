<script lang="ts">
  import type { PageData } from "./$types";
  import LoginForm from "./login-form.svelte";
  import UserHealthDetail from "./user-health-detail.svelte";

  export let data: PageData;
  $: ({form} = data)
</script>
<UserHealthDetail/>
<LoginForm data={form}/>
