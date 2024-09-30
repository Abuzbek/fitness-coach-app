<script context="module" lang="ts">
  export interface ISteps {
    title: string;
    disabledNext: boolean;
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
    <Dialog.Header class="flex-row items-center space-y-0 gap-1.5">
      {#if !allowPrev}
        <Button on:click={prev} variant={'link'} class="flex items-center justify-center p-0 h-6">
          <ChevronLeft />
        </Button>
      {/if}
      <Dialog.Title>{steps[currentStep].title}</Dialog.Title>
    </Dialog.Header>
    <div class="flex-grow h-full">
      <slot name="body" {currentStep} {next} {prev} />
    </div>
    <Dialog.Footer class="">
      {#if !allowNext}
        <slot name="next" {currentStep}>
          <Button
            on:click={next}
            variant={'default'}
            class="flex items-center justify-center pr-3 w-full"
            disabled={steps[currentStep].disabledNext}
          >
            <span class="uppercase">continue</span>
          </Button>
        </slot>
      {:else}
        <slot name="finish"></slot>
      {/if}
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
