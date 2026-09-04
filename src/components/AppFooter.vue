<script setup>
import { RouterLink } from 'vue-router';
import AtomLogo from './AtomLogo.vue';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-line bg-panel/60">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <RouterLink to="/" class="flex items-center gap-2.5" aria-label="Meatball.Cloud — home">
          <AtomLogo class="h-8 w-8 shrink-0" />
          <span class="font-display text-base font-bold text-mist">
            Meatball<span class="text-ember">.Cloud</span>
          </span>
        </RouterLink>
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-soft">
          The all-in-one cloud for restaurants — website, menu, online ordering, Stripe payments, and
          operations with role-based access for servers, chefs, and management.
        </p>
      </div>

      <nav aria-label="Footer — product">
        <h2 class="font-display text-sm font-semibold tracking-widest text-mist uppercase">Product</h2>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li><RouterLink to="/features" class="text-slate-soft transition-colors hover:text-ember">Features &amp; benefits</RouterLink></li>
          <li><RouterLink to="/features#operations" class="text-slate-soft transition-colors hover:text-ember">Operations &amp; RBAC</RouterLink></li>
          <li><RouterLink to="/features#ownership" class="text-slate-soft transition-colors hover:text-ember">Ownership &amp; pricing</RouterLink></li>
        </ul>
      </nav>

      <div>
        <h2 class="font-display text-sm font-semibold tracking-widest text-mist uppercase">Contact</h2>
        <ul class="mt-4 space-y-2.5 text-sm text-slate-soft">
          <li>
            <a href="mailto:hello@meatballcloud.app" class="transition-colors hover:text-cyber">hello@meatballcloud.app</a>
          </li>
          <li>
            <RouterLink to="/contact" class="transition-colors hover:text-ember">Request a free demo</RouterLink>
          </li>
          <li>On-prem or cloud · Zero third-party fees</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-slate-soft sm:flex-row sm:px-6 lg:px-8">
        <p>© {{ year }} Meatball.Cloud. Your data stays yours — 100% customer data ownership.</p>
        <p>meatballcloud.app</p>
      </div>
    </div>
  </footer>
</template>
