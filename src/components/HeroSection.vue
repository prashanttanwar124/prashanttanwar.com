<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { scramble } from '../utils/scramble'
import { magnetize } from '../utils/magnetic'
import MarqueeStrip from './MarqueeStrip.vue'

const tag = ref(null)
const cta = ref(null)
const title = ref(null)

// scales each line so the name always spans the full width, never clips
function fitLines() {
  title.value?.querySelectorAll('.hero-line').forEach((line) => {
    const mask = line.parentElement
    line.style.fontSize = '100px'
    const range = document.createRange()
    range.selectNodeContents(line)
    const w = range.getBoundingClientRect().width
    if (!w) return
    const fit = 100 * (mask.clientWidth / w) * 0.96
    line.style.fontSize = Math.min(fit, window.innerHeight * 0.26) + 'px'
  })
}

const marqueeItems = [
  'Full-Stack Developer',
  'Creative Coder',
  'UI Engineer',
  'Teacher',
  'Based on Earth',
]

onMounted(() => {
  fitLines()
  document.fonts.ready.then(fitLines)
  window.addEventListener('resize', fitLines)

  gsap
    .timeline({ defaults: { ease: 'power4.out' }, delay: 2.2 })
    .from('.hero-line', { yPercent: 110, duration: 1.1, stagger: 0.12 })
    .from('.hero-meta > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')
    .from('.hero-marquee', { opacity: 0, duration: 0.8 }, '-=0.3')

  setTimeout(() => scramble(tag.value, '// creative developer — portfolio v2.0', 1200), 2300)
  cta.value.querySelectorAll('a').forEach((el) => magnetize(el))
})

onBeforeUnmount(() => window.removeEventListener('resize', fitLines))
</script>

<template>
  <header id="home" class="hero">
    <div class="hero-inner">
      <p ref="tag" class="mono hero-tag">// creative developer — portfolio v2.0</p>
      <h1 ref="title" class="hero-title" aria-label="Prashant Tanwar">
        <span class="mask"><span class="hero-line">Prashant</span></span>
        <span class="mask"><span class="hero-line outline">Tanwar</span></span>
      </h1>
      <div class="hero-meta">
        <p class="sub">
          I build web services, APIs &amp; interfaces — and teach
          creative coding. JavaScript is my native language.
        </p>
        <div ref="cta" class="cta">
          <a href="#projects" class="pill pill-solid">Selected works</a>
          <a href="#contact" class="pill">Say hello</a>
        </div>
      </div>
      <div class="scroll-hint mono">scroll<span class="line"></span></div>
    </div>
    <MarqueeStrip class="hero-marquee" :items="marqueeItems" />
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.hero-inner {
  padding: 0 6vw 7vh;
}

.hero-tag {
  color: var(--lime);
  margin-bottom: 3vh;
}

.hero-title {
  font-size: clamp(40px, 9.2vw, 150px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 5vh;
}

.mask {
  display: block;
  overflow: hidden;
}

.hero-line {
  display: block;
  white-space: nowrap;
  line-height: 0.95;
  width: max-content;
}

.hero-meta {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.sub {
  max-width: 380px;
  color: var(--muted);
  font-size: 17px;
}

.cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.scroll-hint {
  position: absolute;
  right: 6vw;
  bottom: 18vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  writing-mode: vertical-rl;
  color: var(--muted);
}

.scroll-hint .line {
  width: 1px;
  height: 56px;
  background: var(--lime);
  animation: drop 1.6s ease-in-out infinite;
}

@keyframes drop {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

@media (max-width: 760px) {
  .scroll-hint {
    display: none;
  }
}
</style>
