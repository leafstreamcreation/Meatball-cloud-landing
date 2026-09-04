<script setup>
import NeonIcon from './NeonIcon.vue';

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  accent: { type: String, default: 'text-ember' },
  glow: { type: String, default: 'glow-ember' }
});
</script>

<template>
  <article class="group relative panel-glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember/40">
    <div class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl border border-line bg-void/60">
      <div class="h-7 w-7 transition-transform duration-300 group-hover:scale-110" :class="[accent, glow]">
        <NeonIcon :name="icon" />
      </div>
    </div>
    <h3 class="font-display text-lg font-semibold text-mist">{{ title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-soft">{{ text }}</p>
  </article>
</template>
