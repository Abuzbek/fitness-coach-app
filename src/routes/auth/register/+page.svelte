<script lang="ts">
  import type { PageData } from "./$types";
  import RegisterForm from "./register-form.svelte";

  export let data: PageData;
  $: ({form} = data)
</script>
<RegisterForm data={form}/>
