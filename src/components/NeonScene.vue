<script setup>
import NeonIcon from './NeonIcon.vue';

// Decorative hero art: neon wireframe plate + orbiting food icons.
const floaters = [
  { icon: 'burger', cls: 'text-ember glow-ember top-[6%] left-[4%] h-16 w-16 animate-floaty', delay: '0s' },
  { icon: 'drink', cls: 'text-cyber glow-cyber top-[10%] right-[6%] h-14 w-14 animate-floaty', delay: '1.2s' },
  { icon: 'pizza', cls: 'text-magenta glow-magenta bottom-[12%] left-[8%] h-16 w-16 animate-floaty', delay: '0.6s' },
  { icon: 'utensils', cls: 'text-ember-soft glow-ember bottom-[6%] right-[10%] h-14 w-14 animate-floaty', delay: '1.8s' },
  { icon: 'sparkle', cls: 'text-cyber glow-cyber top-[46%] left-[-2%] h-8 w-8 animate-flicker', delay: '0s' },
  { icon: 'sparkle', cls: 'text-magenta glow-magenta top-[38%] right-[-1%] h-7 w-7 animate-flicker', delay: '1.4s' }
];
</script>

<template>
  <div class="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
    <!-- glow orbs -->
    <div class="absolute inset-0 rounded-full bg-ember/10 blur-3xl animate-pulse-soft" />
    <div class="absolute inset-8 rounded-full bg-cyber/10 blur-3xl animate-pulse-soft" style="animation-delay: 1.6s" />

    <!-- orbit rings -->
    <svg viewBox="0 0 400 400" class="absolute inset-0 h-full w-full text-line">
      <circle cx="200" cy="200" r="188" fill="none" stroke="currentColor" stroke-dasharray="3 10" class="animate-spin-slow" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" stroke-dasharray="2 14" class="animate-spin-reverse" />
    </svg>

    <!-- central plate -->
    <div class="absolute inset-0 grid place-items-center">
      <div class="relative h-[62%] w-[62%] text-ember glow-ember">
        <NeonIcon name="plate" />
      </div>
      <div class="absolute inset-0 grid place-items-center">
        <div class="h-[38%] w-[38%] text-cyber glow-cyber">
          <NeonIcon name="bolt" />
        </div>
      </div>
    </div>

    <!-- floating food icons -->
    <div
      v-for="(f, i) in floaters"
      :key="i"
      class="absolute"
      :class="f.cls"
      :style="{ animationDelay: f.delay }"
    >
      <NeonIcon :name="f.icon" />
    </div>
  </div>
</template>
