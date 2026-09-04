<script setup>
import NeonIcon from '../components/NeonIcon.vue';
import NeonScene from '../components/NeonScene.vue';
import FeatureCard from '../components/FeatureCard.vue';
import CtaBand from '../components/CtaBand.vue';

const stats = [
  { value: '$0', label: 'Third-party transaction fees' },
  { value: '100%', label: 'Customer data ownership' },
  { value: '2×', label: 'Deployment options — on-prem or cloud' },
  { value: '24/7', label: 'Online ordering for your guests' }
];

const features = [
  {
    icon: 'globe',
    title: 'Custom restaurant website',
    text: 'A branded, responsive website with your menu front and center — no templates that look like everyone else.',
    accent: 'text-ember',
    glow: 'glow-ember'
  },
  {
    icon: 'plate',
    title: 'Digital menu, live updates',
    text: 'Push menu changes, prices, and specials to guests instantly from the operations side.',
    accent: 'text-cyber',
    glow: 'glow-cyber'
  },
  {
    icon: 'card',
    title: 'Online ordering + Stripe',
    text: 'Direct-to-you ordering with secure Stripe payments built in. No marketplaces, no middlemen.',
    accent: 'text-magenta',
    glow: 'glow-magenta'
  },
  {
    icon: 'chart',
    title: 'Order lifecycle at a glance',
    text: 'Follow every order from placed to fulfilled — for the kitchen, the pass, and the front of house.',
    accent: 'text-cyber',
    glow: 'glow-cyber'
  },
  {
    icon: 'users',
    title: 'RBAC for your whole team',
    text: 'Servers, chefs, and management each get role-scoped access to exactly what they need.',
    accent: 'text-ember',
    glow: 'glow-ember'
  },
  {
    icon: 'bell',
    title: 'Customer engagement',
    text: 'Reach your regulars with offers, updates, and moments that bring them back to the table.',
    accent: 'text-magenta',
    glow: 'glow-magenta'
  }
];
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div class="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div class="absolute -top-32 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" aria-hidden="true" />
      <div class="absolute top-40 right-[-8rem] h-80 w-80 rounded-full bg-cyber/10 blur-3xl" aria-hidden="true" />
      <div class="absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full bg-magenta/10 blur-3xl" aria-hidden="true" />

      <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full border border-cyber/40 bg-cyber/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cyber">
            <span class="h-1.5 w-1.5 rounded-full bg-cyber animate-pulse-soft" aria-hidden="true" />
            The all-in-one cloud for restaurants
          </p>

          <h1 class="mt-6 font-display text-4xl leading-[1.08] font-bold tracking-tight text-mist sm:text-5xl lg:text-6xl">
            Your restaurant's website, ordering &amp; operations —<br class="hidden sm:block" />
            <span class="text-ember text-glow-ember">in one cloud.</span>
          </h1>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-soft sm:text-lg">
            Meatball.Cloud gives your restaurant a custom website with menu, online ordering, and Stripe
            payments — plus an operations site for your whole team, from servers to chefs to management.
            Deploy on-prem or in the cloud, pay zero third-party fees, and own 100% of your data.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink
              to="/contact"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-3 font-semibold text-void shadow-[0_0_28px_rgba(255,92,31,0.45)] transition-all hover:bg-ember-soft hover:shadow-[0_0_40px_rgba(255,92,31,0.6)]"
            >
              Request a free demo
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </RouterLink>
            <RouterLink
              to="/features"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-cyber/50 bg-cyber/5 px-7 py-3 font-semibold text-cyber transition-all hover:bg-cyber hover:text-void"
            >
              Explore features
            </RouterLink>
          </div>

          <ul class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-soft">
            <li class="flex items-center gap-2">
              <span class="grid h-4 w-4 shrink-0 place-items-center text-cyber glow-cyber"><NeonIcon name="shield" /></span>
              Zero third-party fees
            </li>
            <li class="flex items-center gap-2">
              <span class="grid h-4 w-4 shrink-0 place-items-center text-magenta glow-magenta"><NeonIcon name="cloud" /></span>
              On-prem or cloud
            </li>
            <li class="flex items-center gap-2">
              <span class="grid h-4 w-4 shrink-0 place-items-center text-ember glow-ember"><NeonIcon name="check" /></span>
              100% data ownership
            </li>
          </ul>
        </div>

        <div class="relative">
          <NeonScene />
        </div>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="border-y border-line bg-panel/50" aria-label="Key numbers">
      <dl class="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="bg-void/40 px-6 py-8 text-center">
          <dt class="order-2 mt-1 block text-xs tracking-wide text-slate-soft sm:text-sm">{{ s.label }}</dt>
          <dd class="order-1 font-display text-3xl font-bold text-ember text-glow-ember sm:text-4xl">{{ s.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- ============ FEATURES HIGHLIGHTS ============ -->
    <section class="relative py-20 sm:py-28">
      <div class="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-semibold tracking-widest text-cyber uppercase">Everything in one place</p>
          <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-mist sm:text-4xl">
            Built for every seat at the table
          </h2>
          <p class="mt-4 text-base leading-relaxed text-slate-soft">
            From the guest's first glance at your menu to the manager's end-of-day report — one
            connected system, no patchwork of apps.
          </p>
        </div>

        <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard v-for="f in features" :key="f.title" v-bind="f" />
        </div>
      </div>
    </section>

    <!-- ============ HOW IT WORKS ============ -->
    <section class="border-t border-line bg-panel/40 py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-semibold tracking-widest text-magenta uppercase">From zero to open</p>
          <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-mist sm:text-4xl">Up and serving in three steps</h2>
        </div>

        <ol class="mt-14 grid gap-6 md:grid-cols-3">
          <li v-for="(step, i) in [
            { n: '01', icon: 'globe', title: 'Configure your site', text: 'Pick your branding, load your menu, set your opening hours. Launch a polished restaurant website in hours, not months.' },
            { n: '02', icon: 'card', title: 'Go live with ordering', text: 'Flip on online ordering with Stripe payments. Guests order directly from your site — no marketplace commissions.' },
            { n: '03', icon: 'chart', title: 'Run the operation', text: 'Manage orders end-to-end, assign roles to servers and chefs, and grow engagement with your regulars.' }
          ]" :key="i" class="relative panel-glass rounded-2xl p-6">
            <span class="absolute top-5 right-6 font-display text-4xl font-bold text-line/60" aria-hidden="true">{{ step.n }}</span>
            <div class="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl border border-line bg-void/60">
              <div class="h-7 w-7 text-magenta glow-magenta"><NeonIcon :name="step.icon" /></div>
            </div>
            <h3 class="font-display text-lg font-semibold text-mist">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-soft">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <CtaBand
      title="Ready to bring your restaurant into one cloud?"
      text="Get a free walkthrough of Meatball.Cloud — website, ordering, payments, and operations — and see what it would look like for your kitchen."
      cta="Request a free demo"
    />
  </div>
</template>
