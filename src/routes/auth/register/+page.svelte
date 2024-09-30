<script lang="ts">
  import Input from '$lib/components/ui/input/input.svelte';
  import RadioCardGroup from '$lib/components/ui/radio-group/radio-card-group.svelte';
  import UserHealthDetail, { type ISteps } from '$lib/components/user-health-detail.svelte';
  import RegisterForm from './register-form.svelte';
  const uc = (str: string) => str.toUpperCase();
  let ageValues: number[] = Array.from({ length: 87 }, (_, i) => i + 14); // 14 to 114 age
  let weightValues: number[] = Array.from({ length: 200 }, (_, i) => i + 30); // 30 to 230 kg
  let heightValues: number[] = Array.from({ length: 121 }, (_, i) => i + 100); // 100 to 220 cm

  const gender_options = [
    { label: 'MALE', value: 'male' },
    { label: 'FEMALE', value: 'female' }
  ];

  const goal_options = [
    { label: uc('Lose Weight'), value: 'lose-weight' },
    { label: uc('Gain Muscle'), value: 'gain-muscle' },
    { label: uc('Improve Endurance'), value: 'improve-endurance' },
    { label: uc('Increase Strength'), value: 'increase-strength' },
    { label: uc('Improve Flexibility'), value: 'improve-flexibility' }
  ];

  const body_type_options = [
    { label: uc('Skinny'), value: 'skinny' },
    { label: uc('Average'), value: 'average' },
    { label: uc('Heavier'), value: 'heavier' }
  ];

  let age = '';
  let weight = '';
  let height = '';
  let gender = '';
  let goal = '';
  let body_type = '';

  let steps: ISteps[];
  $: steps = [
    {
      title: 'WHICH GENDER DO YOU ASSOCIATE YOU WITH?',
      disabledNext: !gender
    },
    {
      title: 'SET YOUR GOAL',
      disabledNext: !goal
    },
    {
      title: uc('choose your body type'),
      disabledNext: !body_type
    },
    {
      title: 'WHAT IS YOUR AGE?',
      disabledNext: !(14 < Number(age) && 100 > Number(age))
    },
    {
      title: 'HOW TALL ARE YOU?',
      disabledNext: !(100 < Number(height) && 220 > Number(height))
    },
    {
      title: 'WHAT IS YOUR CURRENT WEIGHT?',
      disabledNext: !(30 < Number(height) && 230 > Number(height))
    },
    {
      title: uc('Create your account'),
      disabledNext: false
    }
  ];
</script>

<UserHealthDetail {steps}>
  <svelte:fragment slot="body" let:currentStep>
    {#if currentStep === 0}
      <RadioCardGroup options={gender_options} bind:selected={gender} />
    {:else if currentStep === 1}
      <RadioCardGroup options={goal_options} bind:selected={goal} />
    {:else if currentStep === 2}
      <RadioCardGroup options={body_type_options} bind:selected={body_type} />
    {:else if currentStep === 3}
      <Input bind:value={age} type="number" min={ageValues[0]} max={ageValues.at(-1)} />
      <span class="text-muted-foreground text-sm">You must be over 14 years old and under 100 years old</span>
    {:else if currentStep === 4}
      <Input bind:value={height} type="number" min={heightValues[0]} max={heightValues.at(-1)} />
      <span class="text-muted-foreground text-sm">You must be over 14 years old and under 100 years old</span>
    {:else if currentStep === 5}
      <Input bind:value={weight} type="number" min={weightValues[0]} max={weightValues.at(-1)} />
      <span class="text-muted-foreground text-sm">You must be over 14 years old and under 100 years old</span>
    {:else}
      <RegisterForm
        user_health_detail={JSON.stringify({
          age,
          weight,
          height,
          gender,
          goal,
          body_type
        })}
      />
    {/if}
  </svelte:fragment>
</UserHealthDetail>
