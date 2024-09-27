<script lang="ts">
  import { cn } from '$lib/utils';
  import { Label } from '../label';
  import * as RadioGroup from './index';
  interface Options {
    label: string;
    value: string;
  }
  export let options: Options[];
  export let selected: string;
</script>

<RadioGroup.Root bind:value={selected}>
  {#if options}
    {#each options as option (option.value)}
      <RadioGroup.Item
        class={cn(
          'group relative flex items-center justify-between space-x-2 w-full cursor-pointer rounded-lg bg-slate-900/5 py-4 px-5 text-slate-950 shadow-md transition border border-transparent focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[state=checked]:border-primary'
        )}
        value={option.value}
        id={option.value}
      >
        {option.label}
      </RadioGroup.Item>
    {/each}
  {/if}
</RadioGroup.Root>