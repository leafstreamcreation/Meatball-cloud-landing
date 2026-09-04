<script setup>
const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, default: '' }
});

const imageMap = {
  arrow: '/generated-icons/arrow.png',
  bell: '/generated-icons/bell.png',
  bolt: '/generated-icons/bolt.png',
  burger: '/generated-icons/burger.png',
  card: '/generated-icons/card.png',
  chart: '/generated-icons/chart.png',
  check: '/generated-icons/check.png',
  cloud: '/generated-icons/cloud.png',
  drink: '/generated-icons/drink.png',
  globe: '/generated-icons/globe.png',
  pizza: '/generated-icons/pizza.png',
  plate: '/generated-icons/plate.png',
  server: '/generated-icons/server.png',
  shield: '/generated-icons/shield.png',
  sparkle: '/generated-icons/sparkle.png',
  users: '/generated-icons/users.png',
  utensils: '/generated-icons/utensils.png'
};

const iconSource = () => imageMap[props.name] || imageMap.plate;
</script>

<template>
  <img
    :src="iconSource()"
    :alt="title"
    class="h-full w-full object-contain"
    style="mix-blend-mode: screen"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
  />
</template>