<script setup>
import { computed, reactive, ref } from 'vue';
import NeonIcon from '../components/NeonIcon.vue';

const form = reactive({
  name: '',
  email: '',
  restaurant: '',
  interest: 'demo',
  message: ''
});

const errors = reactive({});
const submitted = ref(false);
const submitting = ref(false);
const serverNote = ref('');

const interests = [
  { value: 'demo', label: 'Request a free demo' },
  { value: 'question', label: 'Ask a question' },
  { value: 'pricing', label: 'Pricing & hosting options' }
];

const faqs = [
  {
    q: 'Can we run Meatball.Cloud on our own hardware?',
    a: 'Yes. On-prem hosting is a first-class option — everything runs behind your own firewall with the same features and security as the cloud deployment.'
  },
  {
    q: 'Are there really zero third-party fees?',
    a: 'Correct. No per-order commissions, no marketplace cuts, and no surprise transaction fees. You keep your margins — and your customers.'
  },
  {
    q: 'Who owns the customer data?',
    a: 'You do — 100%. Customer data, orders, and insights belong to your restaurant, are never sold, and are always exportable.'
  },
  {
    q: 'Is pricing really flexible?',
    a: 'Yes. Pay for the scale you need as you grow — on-prem or cloud — without lock-in contracts designed for the exit.'
  }
];

const hasSubmittedOnce = ref(false);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailRe.test(form.email.trim())) errors.email = 'That email address doesn\u2019t look right.';
  if (!form.message.trim()) errors.message = 'Please tell us a little about what you need.';
  else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return Object.keys(errors).length === 0;
}

function fieldError(field) {
  return errors[field] || '';
}

function composeMailRequest() {
    const { name, email, restaurant, interest, message } = form;

    return {
      senderEmail: email,
      replyTo: email,
      destination: import.meta.env.VITE_RECIPIENT_EMAIL,
      subject: `${interest}: ${restaurant}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
  };

async function encryptApiKey() {
  const iv = crypto.getRandomValues(new Uint8Array(parseInt(import.meta.env.VITE_AES_IV_LENGTH || "12")));
  const salt = crypto.getRandomValues(new Uint8Array(parseInt(import.meta.env.VITE_PBKDF2_SALT_LENGTH || "16")));

  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(import.meta.env.VITE_BASE_KEY_SECRET || ""),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: parseInt(import.meta.env.VITE_PBKDF2_ITERATIONS || "100000"),
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    { 
      name: "AES-GCM", 
      iv,
      tagLength: parseInt(import.meta.env.VITE_AES_TAG_LENGTH || "128")
    },
    derivedKey,
    new TextEncoder().encode(import.meta.env.VITE_API_SECRET || "")
  );
  const fullKey = new Uint8Array(salt.byteLength + iv.byteLength + encrypted.byteLength);
  fullKey.set(new Uint8Array(encrypted), 0);
  fullKey.set(iv, encrypted.byteLength);
  fullKey.set(salt, encrypted.byteLength + iv.byteLength);
  return fullKey
}
  
async function onSubmit() {
  hasSubmittedOnce.value = true;
  if (!validate()) return;
  submitting.value = true;
  serverNote.value = '';
  
  try {
    const payload = composeMailRequest();
    const apiKeyEncrypted = await encryptApiKey();
    
    let binary = '';
    for (let i = 0; i < apiKeyEncrypted.byteLength; i++) {
      binary += String.fromCharCode(apiKeyEncrypted[i]);
    }

    const apiKeyEncryptedBase64 = window.btoa(binary);

    await fetch(import.meta.env.VITE_CONTACT_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKeyEncryptedBase64
      },
      body: JSON.stringify(payload)
    });
    
    resetForm()
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    submitting.value = false;
    submitted.value = true;
  }
    
}

const summaryVisible = computed(() => hasSubmittedOnce.value && Object.keys(errors).length > 0);

function resetForm() {
  submitted.value = false;
  Object.keys(form).forEach((k) => (form[k] = k === 'interest' ? 'demo' : ''));
  Object.keys(errors).forEach((k) => delete errors[k]);
  hasSubmittedOnce.value = false;
}
</script>

<template>
  <div class="pt-24 sm:pt-28">
    <!-- ============ PAGE HEADER ============ -->
    <section class="relative overflow-hidden py-12 sm:py-16">
      <div class="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div class="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold tracking-widest text-cyber uppercase">Contact</p>
        <h1 class="mt-3 font-display text-4xl font-bold tracking-tight text-mist sm:text-5xl">
          Ask us anything.<br class="hidden sm:block" />
          <span class="text-ember text-glow-ember">Or book a free demo.</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-soft sm:text-lg">
          Tell us about your restaurant — we'll show you exactly how Meatball.Cloud would run for
          your menu, your team, and your way of hosting.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <!-- ============ FORM ============ -->
        <div class="lg:col-span-3">
          <form v-if="!submitted" novalidate class="panel-glass rounded-3xl p-6 sm:p-8" @submit.prevent="onSubmit" aria-describedby="form-note">
            <h2 class="font-display text-xl font-semibold text-mist">Send us a message</h2>
            <p id="form-note" class="mt-1 text-sm text-slate-soft">
              Fields marked <span class="text-ember" aria-hidden="true">*</span><span class="sr-only">required</span> are required.
            </p>

            <div v-if="summaryVisible" role="alert" class="mt-5 rounded-xl border border-ember/50 bg-ember/10 p-4 text-sm text-ember-soft">
              <p class="font-semibold">Please fix the following:</p>
              <ul class="mt-2 list-inside list-disc space-y-1">
                <li v-for="(msg, field) in errors" :key="field">{{ msg }}</li>
              </ul>
            </div>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label for="f-name" class="mb-1.5 block text-sm font-medium text-mist">
                  Name <span class="text-ember" aria-hidden="true">*</span><span class="sr-only">(required)</span>
                </label>
                <input
                  id="f-name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  class="w-full rounded-xl border bg-void/60 px-4 py-3 text-sm text-mist placeholder:text-slate-soft/60 focus:border-cyber focus:outline-none"
                  :class="fieldError('name') ? 'border-ember/70' : 'border-line'"
                  :aria-invalid="fieldError('name') ? 'true' : 'false'"
                  :aria-describedby="fieldError('name') ? 'e-name' : undefined"
                />
                <p v-if="fieldError('name')" id="e-name" class="mt-1.5 text-sm text-ember-soft">{{ fieldError('name') }}</p>
              </div>

              <div>
                <label for="f-email" class="mb-1.5 block text-sm font-medium text-mist">
                  Email <span class="text-ember" aria-hidden="true">*</span><span class="sr-only">(required)</span>
                </label>
                <input
                  id="f-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  class="w-full rounded-xl border bg-void/60 px-4 py-3 text-sm text-mist placeholder:text-slate-soft/60 focus:border-cyber focus:outline-none"
                  :class="fieldError('email') ? 'border-ember/70' : 'border-line'"
                  :aria-invalid="fieldError('email') ? 'true' : 'false'"
                  :aria-describedby="fieldError('email') ? 'e-email' : undefined"
                />
                <p v-if="fieldError('email')" id="e-email" class="mt-1.5 text-sm text-ember-soft">{{ fieldError('email') }}</p>
              </div>
            </div>

            <div class="mt-5">
              <label for="f-restaurant" class="mb-1.5 block text-sm font-medium text-mist">Restaurant name</label>
              <input
                id="f-restaurant"
                v-model="form.restaurant"
                type="text"
                autocomplete="organization"
                class="w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-sm text-mist placeholder:text-slate-soft/60 focus:border-cyber focus:outline-none"
              />
            </div>

            <fieldset class="mt-5">
              <legend class="mb-2 text-sm font-medium text-mist">What are you interested in?</legend>
              <div class="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <label
                  v-for="opt in interests"
                  :key="opt.value"
                  class="flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-all"
                  :class="form.interest === opt.value ? 'border-cyber/60 bg-cyber/10 text-cyber' : 'border-line bg-void/40 text-slate-soft hover:text-mist'"
                >
                  <input
                    v-model="form.interest"
                    type="radio"
                    name="interest"
                    :value="opt.value"
                    class="sr-only"
                  />
                  <span
                    class="grid h-4 w-4 shrink-0 place-items-center rounded-full border"
                    :class="form.interest === opt.value ? 'border-cyber' : 'border-line'
                    "
                    aria-hidden="true"
                  >
                    <span v-if="form.interest === opt.value" class="h-2 w-2 rounded-full bg-cyber shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  </span>
                  {{ opt.label }}
                </label>
              </div>
            </fieldset>

            <div class="mt-5">
              <label for="f-message" class="mb-1.5 block text-sm font-medium text-mist">
                Message <span class="text-ember" aria-hidden="true">*</span><span class="sr-only">(required)</span>
              </label>
              <textarea
                id="f-message"
                v-model="form.message"
                rows="5"
                class="w-full resize-y rounded-xl border bg-void/60 px-4 py-3 text-sm text-mist placeholder:text-slate-soft/60 focus:border-cyber focus:outline-none"
                :class="fieldError('message') ? 'border-ember/70' : 'border-line'"
                :aria-invalid="fieldError('message') ? 'true' : 'false'"
                :aria-describedby="fieldError('message') ? 'e-message' : undefined"
              ></textarea>
              <p v-if="fieldError('message')" id="e-message" class="mt-1.5 text-sm text-ember-soft">{{ fieldError('message') }}</p>
            </div>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-3 font-semibold text-void shadow-[0_0_28px_rgba(255,92,31,0.45)] transition-all hover:bg-ember-soft disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="submitting"
              >
                <svg v-if="submitting" viewBox="0 0 24 24" class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
                <span v-else aria-hidden="true" class="grid h-4 w-4 place-items-center"><NeonIcon name="sparkle" /></span>
                {{ submitting ? 'Sending…' : 'Send message' }}
              </button>
              <p class="text-xs text-slate-soft">
                We reply within one business day. No spam, no sharing your info — ever.
              </p>
            </div>

            <p v-if="serverNote" class="mt-3 text-sm text-ember-soft" role="status">{{ serverNote }}</p>
          </form>

          <!-- Success state -->
          <div v-else role="status" class="panel-glass rounded-3xl p-8 text-center sm:p-12">
            <div class="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-cyber/60 bg-cyber/10 text-cyber glow-cyber">
              <NeonIcon name="check" />
            </div>
            <h2 class="font-display text-2xl font-bold text-mist">Message sent — thank you!</h2>
            <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-soft">
              We've received your note<template v-if="form.restaurant"> about {{ form.restaurant }}</template>.
              Someone from the Meatball.Cloud team will get back to you at
              <span class="text-cyber">{{ form.email }}</span> within one business day.
            </p>
            <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <RouterLink to="/features" class="rounded-full border border-line bg-void/40 px-6 py-2.5 text-sm font-semibold text-mist transition-colors hover:text-cyber">
                Explore features
              </RouterLink>
              <button type="button" class="rounded-full border border-line bg-void/40 px-6 py-2.5 text-sm font-semibold text-mist transition-colors hover:text-cyber" @click="resetForm">
                Send another message
              </button>
            </div>
          </div>
        </div>

        <!-- ============ SIDE INFO + FAQ ============ -->
        <div class="lg:col-span-2">
          <div class="panel-glass rounded-3xl p-6 sm:p-8">
            <h2 class="font-display text-xl font-semibold text-mist">Talk to us</h2>
            <ul class="mt-5 space-y-4 text-sm">
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-void/60 text-cyber glow-cyber"><NeonIcon name="bolt" /></span>
                <div>
                  <p class="font-medium text-mist">Email</p>
                  <a href="mailto:hello@meatballcloud.app" class="text-slate-soft transition-colors hover:text-cyber">hello@meatballcloud.app</a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-void/60 text-ember glow-ember"><NeonIcon name="cloud" /></span>
                <div>
                  <p class="font-medium text-mist">Hosting</p>
                  <p class="text-slate-soft">On-prem or cloud — you choose</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-void/60 text-magenta glow-magenta"><NeonIcon name="chart" /></span>
                <div>
                  <p class="font-medium text-mist">Response time</p>
                  <p class="text-slate-soft">Within one business day</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-8">
            <h2 class="font-display text-xl font-semibold text-mist">Common questions</h2>
            <div class="mt-4 space-y-3">
              <details v-for="faq in faqs" :key="faq.q" class="group panel-glass rounded-2xl">
                <summary class="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-mist marker:content-none">
                  {{ faq.q }}
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4 shrink-0 text-slate-soft transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p class="px-5 pb-4 text-sm leading-relaxed text-slate-soft">{{ faq.a }}</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
