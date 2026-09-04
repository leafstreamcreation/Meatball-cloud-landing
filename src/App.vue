<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-cyber focus:px-4 focus:py-2 focus:font-semibold focus:text-void"
  >
    Skip to main content
  </a>

  <div class="flex min-h-screen flex-col bg-void text-mist">
    <AppHeader />
    <main id="main-content" tabindex="-1" class="flex-1 outline-none">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
