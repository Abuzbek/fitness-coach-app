<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import Input from '$lib/components/ui/input/input.svelte';
  import RadioCardGroup from '$lib/components/ui/radio-group/radio-card-group.svelte';
  import { ChevronLeft, ChevronRight } from 'svelte-radix';
  let ageValues: number[] = Array.from({ length: 100 }, (_, i) => i + 14); // 14 to 114 age
  let weightValues: number[] = Array.from({ length: 200 }, (_, i) => i + 30); // 30 to 230 kg
  let heightValues: number[] = Array.from({ length: 121 }, (_, i) => i + 100); // 100 to 220 cm

  let selectedAge: string = ''; // Default age
  let selectedWeight: string = ''; // Default weight
  let selectedHeight: string = ''; // Default height
  const uc = (str: string) => str.toUpperCase();
  let steps = [
    {
      title: 'WHICH GENDER DO YOU ASSOCIATE YOU WITH?',
      component: RadioCardGroup,
      props: {
        options: [
          { label: 'MALE', value: 'male' },
          { label: 'FEMALE', value: 'female' }
        ]
      }
    },
    {
      title: 'SET YOUR GOAL',
      component: RadioCardGroup,
      props: {
        options: [
          { label: uc('Lose Weight'), value: 'lose-weight' },
          { label: uc('Gain Muscle'), value: 'gain-muscle' },
          { label: uc('Improve Endurance'), value: 'improve-endurance' },
          { label: uc('Increase Strength'), value: 'increase-strength' },
          { label: uc('Improve Flexibility'), value: 'improve-flexibility' }
        ]
      }
    },
    {
      title: 'WHAT MOTIVATES YOU TO EXERCISE?',
      component: RadioCardGroup,
      props: {
        options: [
          { label: uc('Health & fitness'), value: 'health_fitness' },
          { label: uc('Stress relief'), value: 'stress_relief' },
          { label: uc('Physical goals'), value: 'physical_goals' },
          { label: uc('More energy'), value: 'more_energy' },
          { label: uc('Discipline & routine'), value: 'discipline_routine' }
        ]
      }
    },
    {
      title: uc('choose your body type'),
      component: RadioCardGroup,
      props: {
        options: [
          { label: uc('Skinny'), value: 'skinny' },
          { label: uc('Average'), value: 'average' },
          { label: uc('Heavier'), value: 'heavier' }
        ]
      }
    },
    {
      title: uc('choose a target body type?'),
      component: RadioCardGroup,
      props: {
        options: [
          { label: uc('Lean'), value: 'lean' },
          { label: uc('Athletic'), value: 'athletic' },
          { label: uc('Muscular'), value: 'muscular' },
          { label: uc('Toned'), value: 'toned' },
          { label: uc('Bulkier'), value: 'bulkier' }
        ]
      }
    },
    {
      title: 'WHAT IS YOUR AGE?',
      component: Input,
      props: {
        value: selectedAge,
        type: 'number',
        min: ageValues[0],
        max: ageValues.at(-1)
      }
    },
    {
      title: 'HOW TALL ARE YOU?',
      component: Input,
      props: {
        value: selectedHeight,
        type: 'number',
        min: heightValues[0],
        max: heightValues.at(-1)
      }
    },
    {
      title: 'WHAT IS YOUR CURRENT WEIGHT?',
      component: Input,
      props: {
        value: selectedWeight,
        type: 'number',
        min: weightValues[0],
        max: weightValues.at(-1)
      }
    }
  ];
  let currentStep = 0;

  const next = () => (currentStep += 1);
  const prev = () => (currentStep -= 1);

  $: allowNext = currentStep >= steps.length - 1;
  $: allowPrev = currentStep <= 0;
</script>

<Dialog.Root closeOnOutsideClick={false} open>
  <Dialog.Content class="min-h-96 max-h-[calc(100dvh-10rem)] flex flex-col">
    <Dialog.Header>
      <Dialog.Title>{steps[currentStep].title}</Dialog.Title>
    </Dialog.Header>
    <div class="flex-grow h-full">
      <svelte:component this={steps[currentStep].component} {...steps[currentStep].props} />
    </div>
    <Dialog.Footer class="flex items-center justify-between">
      <Button
        on:click={prev}
        variant={allowPrev ? 'ghost' : 'default'}
        class="flex items-center justify-center pl-3"
        disabled={currentStep <= 0}
      >
        <ChevronLeft />
        <span>Prev</span>
      </Button>
      <Button
        on:click={next}
        variant={allowNext ? 'ghost' : 'default'}
        class="flex items-center justify-center pr-3"
        disabled={currentStep >= steps.length - 1}
      >
        <span>Next</span>
        <ChevronRight />
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
