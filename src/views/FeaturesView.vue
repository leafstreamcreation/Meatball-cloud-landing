<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NeonIcon from '../components/NeonIcon.vue';
import LifecycleFlow from '../components/LifecycleFlow.vue';
import CtaBand from '../components/CtaBand.vue';

const route = useRoute();

const tabs = [
  {
    id: 'website',
    label: 'Website & Ordering',
    icon: 'globe',
    accent: 'text-ember',
    glow: 'glow-ember',
    heading: 'A website your guests love — and ordering that pays for itself',
    intro:
      'Your restaurant gets a custom, responsive website with your menu at the heart of it. Guests browse, build carts, and check out with Stripe — directly with you, never through a third-party marketplace.',
    items: [
      { icon: 'globe', accent: 'text-ember', glow: 'glow-ember', title: 'Custom branded website', text: 'Your colors, your voice, your menu. Responsive on every device, fast on every connection.' },
      { icon: 'plate', accent: 'text-cyber', glow: 'glow-cyber', title: 'Live menu management', text: 'Update dishes, prices, photos, and availability in seconds — changes publish to guests instantly.' },
      { icon: 'card', accent: 'text-magenta', glow: 'glow-magenta', title: 'Online ordering built in', text: 'Cart, modifiers, special instructions, and checkout — a frictionless path from craving to order.' },
      { icon: 'shield', accent: 'text-cyber', glow: 'glow-cyber', title: 'Secure Stripe payments', text: 'Industry-standard payment processing with modern security. Guests pay with confidence, you get paid directly.' }
    ]
  },
  {
    id: 'operations',
    label: 'Operations & RBAC',
    icon: 'chart',
    accent: 'text-cyber',
    glow: 'glow-cyber',
    heading: 'Run the whole shift from one operations site',
    intro:
      'The operations site is where your restaurant runs: orders flow through a live lifecycle, and every team member gets role-based access — servers, chefs, and management each see exactly what their job needs.',
    items: [
      { icon: 'chart', accent: 'text-cyber', glow: 'glow-cyber', title: 'Order lifecycle, live', text: 'Track every order from placed to fulfilled. Kitchen screens, pass tickets, and front-of-house views stay in sync.' },
      { icon: 'users', accent: 'text-ember', glow: 'glow-ember', title: 'Role-based access control', text: 'Servers take and manage guest orders, chefs see the kitchen queue, management sees the full picture — scoped, audited, secure.' },
      { icon: 'bell', accent: 'text-magenta', glow: 'glow-magenta', title: 'Customer engagement', text: 'Know your regulars. Send offers and updates, and build loyalty that keeps tables full.' },
      { icon: 'server', accent: 'text-cyber', glow: 'glow-cyber', title: 'Deploy your way', text: 'Run on your own hardware on-prem, or in the cloud — the same secure stack, your choice.' }
    ]
  },
  {
    id: 'ownership',
    label: 'Ownership & Pricing',
    icon: 'shield',
    accent: 'text-magenta',
    glow: 'glow-magenta',
    heading: "Own your restaurant's data. Pay your way.",
    intro:
      "Meatball.Cloud is built on a simple principle: it's your restaurant's system, not ours. Flexible pricing, zero third-party fees, and data you fully own — on-prem or in the cloud.",
    items: [
      { icon: 'cloud', accent: 'text-cyber', glow: 'glow-cyber', title: 'On-prem or cloud hosting', text: 'Keep everything behind your own firewall, or let us run it in the cloud. Same features, same security, your choice.' },
      { icon: 'bolt', accent: 'text-ember', glow: 'glow-ember', title: 'Zero third-party fees', text: 'No per-order commissions, no marketplace cuts, no surprise transaction fees eating your margin.' },
      { icon: 'shield', accent: 'text-magenta', glow: 'glow-magenta', title: '100% customer data ownership', text: 'Your customers, your orders, your insights — yours. Exportable, portable, and never sold.' },
      { icon: 'chart', accent: 'text-cyber', glow: 'glow-cyber', title: 'Flexible pricing', text: 'Pay for the scale you need, with pricing that grows with you — not lock-in contracts designed for the exit.' }
    ]
  }
];

const activeTab = ref(tabs[0].id);
const tabRefs = ref([]);

const lifecycleSteps = [
  { label: 'Placed', hint: 'Guest checks out', icon: 'card' },
  { label: 'Confirmed', hint: 'Kitchen accepts', icon: 'check' },
  { label: 'Preparing', hint: 'Chefs cook', icon: 'plate' },
  { label: 'Ready', hint: 'Pass, pickup or delivery', icon: 'bell' },
  { label: 'Fulfilled', hint: 'Served & settled', icon: 'sparkle' }
];

const roles = [
  { role: 'Servers', scope: 'Order entry, guest updates, ticket status', icon: 'users', accent: 'text-ember', glow: 'glow-ember' },
  { role: 'Chefs', scope: 'Kitchen queue, prep, ready-to-serve', icon: 'plate', accent: 'text-cyber', glow: 'glow-cyber' },
  { role: 'Management', scope: 'Full lifecycle, menu, staff, reporting', icon: 'chart', accent: 'text-magenta', glow: 'glow-magenta' }
];

const comparison = [
  { aspect: 'Hosting', meatball: 'On-prem or cloud — your choice', typical: 'Vendor cloud only' },
  { aspect: 'Transaction fees', meatball: '$0 third-party fees', typical: 'Up to 30% per order' },
  { aspect: 'Customer data', meatball: '100% owned by you', typical: 'Owned by the platform' },
  { aspect: 'Team access', meatball: 'RBAC for servers, chefs, management', typical: 'One generic admin account' },
  { aspect: 'Order management', meatball: 'Live lifecycle built in', typical: 'Email printouts & spreadsheets' }
];

function selectTab(id) {
  activeTab.value = id;
}

function onTabKeydown(e, index) {
  let next = null;
  if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = tabs.length - 1;
  if (next !== null) {
    e.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.value[next]?.focus();
  }
}

function scrollToPanel(hash) {
  if (!hash) return;
  const clean = hash.replace('#', '');
  if (clean === 'operations' || clean === 'ownership' || clean === 'website') {
    selectTab(clean);
  }
  const el = document.getElementById(clean || 'features-tabs');
  if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

watch(
  () => route.hash,
  (h) => scrollToPanel(h)
);

onMounted(() => scrollToPanel(route.hash));
</script>

<template>
  <div class="pt-24 sm:pt-28">
    <!-- ============ PAGE HEADER ============ -->
    <section class="relative overflow-hidden py-12 sm:py-16">
      <div class="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div class="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-cyber/10 blur-3xl" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold tracking-widest text-cyber uppercase">Features &amp; benefits</p>
        <h1 class="mt-3 font-display text-4xl font-bold tracking-tight text-mist sm:text-5xl">
          Everything your restaurant needs.<br class="hidden sm:block" />
          <span class="text-ember text-glow-ember">Nothing you don't.</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg">
          One platform for your guest-facing website and your back-of-house operation — with the
          ownership, hosting, and pricing flexibility that puts you in control.
        </p>
      </div>
    </section>

    <!-- ============ TABBED DEEP DIVE ============ -->
    <section id="features-tabs" class="mx-auto max-w-7xl scroll-mt-24 px-4 pb-8 sm:px-6 lg:px-8">
      <div
        role="tablist"
        aria-label="Feature areas"
        class="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
      >
        <button
          v-for="(tab, i) in tabs"
          :id="'tab-' + tab.id"
          :key="tab.id"
          ref="tabRefs"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="'panel-' + tab.id"
          :tabindex="activeTab === tab.id ? 0 : -1"
          class="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all"
          :class="
            activeTab === tab.id
              ? 'border-ember/60 bg-ember/10 text-ember shadow-[0_0_20px_rgba(255,92,31,0.25)]'
              : 'border-line bg-panel/60 text-slate-soft hover:text-mist'
          "
          @click="selectTab(tab.id)"
          @keydown="onTabKeydown($event, i)"
        >
          <span class="grid h-5 w-5 place-items-center" :class="[tab.accent, tab.glow]"><NeonIcon :name="tab.icon" /></span>
          {{ tab.label }}
        </button>
      </div>

      <div
        v-for="tab in tabs"
        :id="'panel-' + tab.id"
        :key="tab.id"
        role="tabpanel"
        :aria-labelledby="'tab-' + tab.id"
        :tabindex="0"
        class="mt-10 scroll-mt-24"
        :class="activeTab === tab.id ? 'block' : 'hidden'"
      >
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="font-display text-2xl font-bold tracking-tight text-mist sm:text-3xl">{{ tab.heading }}</h2>
          <p class="mt-4 text-base leading-relaxed text-slate-soft">{{ tab.intro }}</p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in tab.items" :key="item.title" class="panel-glass rounded-2xl p-5">
            <div class="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl border border-line bg-void/60">
              <div class="h-6 w-6" :class="[item.accent, item.glow]"><NeonIcon :name="item.icon" /></div>
            </div>
            <h3 class="font-display text-base font-semibold text-mist">{{ item.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-soft">{{ item.text }}</p>
          </article>
        </div>

        <!-- Operations extras -->
        <div v-if="tab.id === 'operations'" class="mt-12 space-y-12">
          <div class="panel-glass rounded-2xl p-6 sm:p-8">
            <h3 class="text-center font-display text-xl font-semibold text-mist">The order lifecycle</h3>
            <p class="mx-auto mt-2 max-w-xl text-center text-sm text-slate-soft">
              Every order moves through a live, shared pipeline — visible in real time to the people who need it.
            </p>
            <div class="mt-8">
              <LifecycleFlow :steps="lifecycleSteps" accent="text-cyber" glow="glow-cyber" />
            </div>
          </div>

          <div>
            <h3 class="text-center font-display text-xl font-semibold text-mist">Roles that match your restaurant</h3>
            <div class="mt-8 grid gap-5 md:grid-cols-3">
              <article v-for="r in roles" :key="r.role" class="panel-glass rounded-2xl p-6 text-center">
                <div class="mx-auto mb-3 inline-grid h-12 w-12 place-items-center rounded-full border border-line bg-void/60">
                  <div class="h-7 w-7" :class="[r.accent, r.glow]"><NeonIcon :name="r.icon" /></div>
                </div>
                <h4 class="font-display text-lg font-semibold text-mist">{{ r.role }}</h4>
                <p class="mt-2 text-sm text-slate-soft">{{ r.scope }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ COMPARISON ============ -->
    <section class="border-t border-line bg-panel/40 py-20 sm:py-24">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-3xl font-bold tracking-tight text-mist sm:text-4xl">
            Not your typical food-tech stack
          </h2>
          <p class="mt-4 text-base leading-relaxed text-slate-soft">
            Most platforms take a cut and keep your data. Meatball.Cloud works the other way around.
          </p>
        </div>

        <div class="mt-12 overflow-x-auto rounded-2xl border border-line">
          <table class="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption class="sr-only">
              Comparison of Meatball.Cloud with typical third-party ordering platforms
            </caption>
            <thead>
              <tr class="border-b border-line bg-void/60">
                <th scope="col" class="px-5 py-4 font-display font-semibold text-slate-soft">Aspect</th>
                <th scope="col" class="px-5 py-4 font-display font-semibold text-ember text-glow-ember">Meatball.Cloud</th>
                <th scope="col" class="px-5 py-4 font-display font-semibold text-slate-soft">Typical platform</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparison" :key="row.aspect" class="border-b border-line/60 last:border-b-0" :class="i % 2 ? 'bg-panel/40' : ''">
                <th scope="row" class="px-5 py-4 font-medium text-mist">{{ row.aspect }}</th>
                <td class="px-5 py-4 text-cyber">{{ row.meatball }}</td>
                <td class="px-5 py-4 text-slate-soft">{{ row.typical }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <CtaBand
      title="See it on your own screens"
      text="Book a free demo and watch an order travel from a guest's cart to a chef's screen — then talk through hosting, data, and pricing for your restaurant."
      cta="Request a free demo"
    />
  </div>
</template>
