<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
  cta: { type: String, default: 'Request a free demo' },
  to: { type: String, default: '/contact' }
});
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
    <div class="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-ember/15 blur-3xl" aria-hidden="true" />
    <div class="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h2 class="font-display text-3xl font-bold tracking-tight text-mist sm:text-4xl">{{ title }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-soft">{{ text }}</p>
      <RouterLink
        :to="to"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3 font-semibold text-void shadow-[0_0_28px_rgba(255,92,31,0.45)] transition-all hover:bg-ember-soft hover:shadow-[0_0_40px_rgba(255,92,31,0.6)]"
      >
        {{ cta }}
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </RouterLink>
    </div>
  </section>
</template>
