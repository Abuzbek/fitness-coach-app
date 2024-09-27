<script context="module" lang="ts">
  export interface ISteps {
    title: string;
  }
</script>

<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { ChevronLeft, ChevronRight } from 'svelte-radix';
  export let steps: ISteps[];
  export const step: number = 0;
  export const next: any = () => (currentStep += 1);
  export const prev: any = () => (currentStep -= 1);

  let currentStep: number;

  $: currentStep = step;

  $: allowNext = currentStep >= steps.length - 1;
  $: allowPrev = currentStep <= 0;
</script>

<Dialog.Root closeOnOutsideClick={false} open>
  <Dialog.Content class="min-h-96 max-h-[calc(100dvh-10rem)] flex flex-col">
    <Dialog.Header>
      <Dialog.Title>{steps[currentStep].title}</Dialog.Title>
    </Dialog.Header>
    <div class="flex-grow h-full">
      <slot name="body" {currentStep} {next} {prev} />
    </div>
    <Dialog.Footer class="flex items-center justify-between">
      <Button
        on:click={prev}
        variant={allowPrev ? 'ghost' : 'default'}
        class="flex items-center justify-center pl-3"
        disabled={currentStep <= 0}
      >
        <ChevronLeft />
        <span class="uppercase">prev</span>
      </Button>
      <slot name="next" {currentStep}>
        <Button on:click={next} variant={'default'} class="flex items-center justify-center pr-3">
          {#if !allowNext}
            <span class="uppercase">next</span>
          {:else}
            <span class="uppercase">finish</span>
          {/if}
          <ChevronRight />
        </Button>
      </slot>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
