<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// star that spins and swells with speed + dashed reticle that trails behind,
// showing a context word over interactive elements (data-cursor="...")
const star = ref(null)
const reticle = ref(null)
const label = ref(null)

let mx = -100
let my = -100
let rx = -100
let ry = -100
let lastX = -100
let lastY = -100
let spin = 0
let rafId

function onMove(e) {
  mx = e.clientX
  my = e.clientY
}

function onOver(e) {
  const tagged = e.target.closest('[data-cursor]')
  const interactive = tagged || e.target.closest('a, button, .hover-target')
  const word = tagged?.dataset.cursor || (interactive ? 'open' : '')
  if (label.value) label.value.textContent = word
  reticle.value?.classList.toggle('big', !!interactive)
}

function onDown() {
  star.value?.classList.add('press')
  reticle.value?.classList.add('press')
}

function onUp() {
  star.value?.classList.remove('press')
  reticle.value?.classList.remove('press')
}

onMounted(() => {
  const loop = () => {
    const speed = Math.hypot(mx - lastX, my - lastY)
    lastX = mx
    lastY = my
    spin += 1.2 + speed * 0.25
    const swell = 1 + Math.min(speed * 0.02, 0.8)

    rx += (mx - rx) * 0.14
    ry += (my - ry) * 0.14

    if (star.value) {
      star.value.style.transform = `translate(${mx}px, ${my}px)`
      star.value.firstElementChild.style.transform = `rotate(${spin}deg) scale(${swell})`
    }
    if (reticle.value) {
      reticle.value.style.transform = `translate(${rx}px, ${ry}px)`
    }
    rafId = requestAnimationFrame(loop)
  }
  loop()
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
})
</script>

<template>
  <div ref="star" class="cursor-star"><span>✦</span></div>
  <div ref="reticle" class="cursor-reticle">
    <span class="ring"></span>
    <span class="tick t1"></span>
    <span class="tick t2"></span>
    <span class="tick t3"></span>
    <span class="tick t4"></span>
    <span ref="label" class="word"></span>
  </div>
</template>

<style scoped>
.cursor-star,
.cursor-reticle {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
}

.cursor-star span {
  display: block;
  margin: -11px 0 0 -11px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 18px;
  color: var(--lime);
  text-shadow: 0 0 12px rgba(204, 255, 0, 0.8);
  transition: opacity 0.2s;
}

.cursor-star.press span {
  color: var(--violet);
}

.cursor-reticle {
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.25s, height 0.25s, margin 0.25s;
}

.ring {
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(236, 234, 227, 0.5);
  border-radius: 50%;
  animation: reticle-spin 9s linear infinite;
  transition: border-color 0.25s, inset 0.25s;
}

.tick {
  position: absolute;
  background: var(--lime);
  opacity: 0;
  transition: opacity 0.25s;
}

.t1, .t3 {
  width: 1.5px;
  height: 8px;
  left: calc(50% - 0.75px);
}

.t2, .t4 {
  width: 8px;
  height: 1.5px;
  top: calc(50% - 0.75px);
}

.t1 { top: -4px; }
.t3 { bottom: -4px; }
.t2 { left: -4px; }
.t4 { right: -4px; }

.word {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lime);
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.25s, transform 0.25s;
}

.cursor-reticle.big {
  width: 84px;
  height: 84px;
  margin: -42px 0 0 -42px;
}

.cursor-reticle.big .ring {
  border-color: var(--lime);
  animation-duration: 4s;
}

.cursor-reticle.big .tick {
  opacity: 1;
}

.cursor-reticle.big .word {
  opacity: 1;
  transform: translateY(54px);
}

.cursor-reticle.press .ring {
  inset: 6px;
}

@keyframes reticle-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (pointer: coarse) {
  .cursor-star,
  .cursor-reticle {
    display: none;
  }
}
</style>
