<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AtomLogo from './AtomLogo.vue';

const route = useRoute();
const open = ref(false);
const scrolled = ref(false);

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/contact', label: 'Contact' }
];

function onScroll() {
  scrolled.value = window.scrollY > 8;
}

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  }
);

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled || open ? 'border-b border-line bg-void/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="group flex items-center gap-2.5" aria-label="Meatball.Cloud — home">
        <AtomLogo class="h-9 w-9 shrink-0" :animated="true" />
        <span class="font-display text-lg font-bold tracking-tight text-mist">
          Meatball<span class="text-ember text-glow-ember">.Cloud</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-slate-soft transition-colors hover:text-mist"
          active-class="text-ember"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="ml-3 rounded-full border border-ember/50 bg-ember/10 px-4 py-2 text-sm font-semibold text-ember transition-all hover:bg-ember hover:text-void hover:shadow-[0_0_20px_rgba(255,92,31,0.45)]"
        >
          Get a free demo
        </RouterLink>
      </nav>

      <button
        type="button"
        class="relative grid h-10 w-10 place-items-center rounded-md border border-line text-mist md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="open = !open"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-show="open" id="mobile-menu" class="border-t border-line bg-void/95 backdrop-blur-md md:hidden">
      <nav class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2.5 text-base font-medium text-slate-soft hover:text-mist"
          active-class="text-ember"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="mt-2 rounded-full border border-ember/50 bg-ember/10 px-4 py-2.5 text-center text-base font-semibold text-ember"
        >
          Get a free demo
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
