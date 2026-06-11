<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['finished'])
const counter = ref(null)
const root = ref(null)

onMounted(() => {
  document.body.style.overflow = 'hidden'
  const n = { v: 0 }
  gsap
    .timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        emit('finished')
      },
    })
    .to(n, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counter.value) counter.value.textContent = String(Math.round(n.v)).padStart(3, '0')
      },
    })
    .to(root.value.querySelectorAll('.shutter'), {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      stagger: 0.07,
    })
})
</script>

<template>
  <div ref="root" class="preloader">
    <div class="shutter s1">
      <span class="mono label">prashant tanwar® — portfolio.exe</span>
      <span ref="counter" class="count">000</span>
    </div>
    <div class="shutter s2"></div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: none;
}

.shutter {
  position: absolute;
  inset: 0;
}

.s1 {
  background: var(--bg);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 40px;
}

.s2 {
  background: var(--lime);
  z-index: 1;
}

.label {
  color: var(--ink);
}

.count {
  align-self: flex-end;
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(90px, 18vw, 220px);
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 2px var(--lime);
}
</style>
