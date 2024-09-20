<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
  import Check from 'svelte-radix/Check.svelte';
  import { cn } from '$lib/utils.js';

  type $$Props = RadioGroupPrimitive.ItemProps & {
    value: string;
  };
  type $$Events = RadioGroupPrimitive.ItemEvents;

  let className: $$Props['class'] = undefined;
  export let value: $$Props['value'];
  export { className as class };
</script>

<RadioGroupPrimitive.Item
  {value}
  class={cn(
    className
  )}
  {...$$restProps}
  on:click
  let:builder
>
  <slot {builder}/>
  <div class="flex items-center justify-center">
    <RadioGroupPrimitive.ItemIndicator class="size-6 rounded-full bg-primary flex items-center justify-center opacity-0 transition text-white group-data-[state=checked]:opacity-100">
      <Check class="h-3.5 w-3.5" />
    </RadioGroupPrimitive.ItemIndicator>
  </div>
</RadioGroupPrimitive.Item>
