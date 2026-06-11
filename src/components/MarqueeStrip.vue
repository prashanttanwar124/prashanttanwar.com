<script setup>
defineProps({
  items: { type: Array, required: true },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <div class="marquee" :class="{ reverse }">
    <div class="inner">
      <template v-for="n in 2" :key="n">
        <span v-for="(item, i) in items" :key="`${n}-${i}`" class="item">
          {{ item }} <i>✦</i>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  white-space: nowrap;
}

.inner {
  display: inline-flex;
  width: max-content;
  animation: slide 24s linear infinite;
}

.reverse .inner {
  animation-direction: reverse;
}

.item {
  font-family: var(--display);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  padding-right: 28px;
}

.item i {
  font-style: normal;
  color: var(--lime);
  padding-left: 28px;
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}
</style>
