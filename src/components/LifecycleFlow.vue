<script setup>
import NeonIcon from './NeonIcon.vue';

defineProps({
  steps: { type: Array, required: true },
  accent: { type: String, default: 'text-cyber' },
  glow: { type: String, default: 'glow-cyber' }
});
</script>

<template>
  <ol class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
    <li v-for="(step, i) in steps" :key="step.label" class="flex flex-1 items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
      <div class="flex w-full items-center gap-3 sm:flex-col sm:gap-2">
        <div class="flex items-center gap-3">
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-void/70"
            :class="[accent, glow]"
          >
            <NeonIcon :name="step.icon" />
          </span>
          <div class="sm:mt-2 sm:text-center">
            <p class="text-xs font-semibold tracking-widest uppercase" :class="accent">{{ step.label }}</p>
            <p class="text-xs text-slate-soft">{{ step.hint }}</p>
          </div>
        </div>
        <svg
          v-if="i < steps.length - 1"
          viewBox="0 0 24 24"
          class="ml-auto h-5 w-5 shrink-0 text-line sm:mx-auto sm:ml-0 sm:rotate-90"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </li>
  </ol>
</template>
