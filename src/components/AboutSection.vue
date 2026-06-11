<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
const sketch = ref(null)

let rafId
let pointer = { x: -999, y: -999 }

// generative flow-field sketch — a nod to the creative-coding classroom
function startSketch() {
  const canvas = sketch.value
  const size = canvas.parentElement.clientWidth
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#060606'
  ctx.fillRect(0, 0, size, size)

  const N = 320
  const dots = Array.from({ length: N }, () => ({
    x: Math.random() * size,
    y: Math.random() * size,
  }))

  const loop = (now) => {
    ctx.fillStyle = 'rgba(6, 6, 6, 0.06)'
    ctx.fillRect(0, 0, size, size)
    const t = now / 4000
    dots.forEach((d, i) => {
      const angle =
        Math.sin(d.x * 0.01 + t) + Math.cos(d.y * 0.012 - t) + Math.sin(t * 0.5) * 2
      let vx = Math.cos(angle) * 1.2
      let vy = Math.sin(angle) * 1.2
      const dx = d.x - pointer.x
      const dy = d.y - pointer.y
      const dist2 = dx * dx + dy * dy
      if (dist2 < 6400) {
        vx += dx / 40
        vy += dy / 40
      }
      d.x += vx
      d.y += vy
      if (d.x < 0) d.x = size
      if (d.x > size) d.x = 0
      if (d.y < 0) d.y = size
      if (d.y > size) d.y = 0
      ctx.fillStyle = i % 7 === 0 ? '#ccff00' : 'rgba(124, 108, 255, 0.75)'
      ctx.fillRect(d.x, d.y, 1.6, 1.6)
    })
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect()
    pointer.x = ((e.clientX - r.left) / r.width) * size
    pointer.y = ((e.clientY - r.top) / r.height) * size
  })
  canvas.addEventListener('pointerleave', () => {
    pointer.x = -999
    pointer.y = -999
  })
}

const facts = [
  ['name', 'Prashant Tanwar'],
  ['role', 'Full-stack developer'],
  ['edu', 'BCA + Conestoga College'],
  ['side quest', 'Teaching creative code'],
]

onMounted(() => {
  startSketch()
  gsap.from(root.value.querySelectorAll('.reveal'), {
    scrollTrigger: { trigger: root.value, start: 'top 70%' },
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
  })
})

onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="ghost outline" aria-hidden="true">About</div>
    <div class="grid">
      <div class="copy">
        <div class="sec-head reveal">
          <span class="sec-index">(01)</span>
          <h2 class="sec-title">Human<br /><span class="outline">behind code</span></h2>
        </div>
        <p class="reveal">
          Full-stack developer who treats the browser like a playground.
          At <strong>Brandshark</strong> I shipped web services, APIs and interfaces
          end-to-end; at <strong>Fortify Solutions</strong> I taught creative coding —
          the art of making machines do beautiful, useless, wonderful things.
        </p>
        <p class="reveal">
          Before that: inventory &amp; customer service at <strong>Maniratn Jewellers</strong>,
          where I learned that people skills compile everywhere.
        </p>
        <ul class="facts reveal">
          <li v-for="[k, v] in facts" :key="k">
            <span class="mono">{{ k }}</span>
            <span class="val">{{ v }}</span>
          </li>
        </ul>
      </div>
      <figure class="sketch-frame reveal hover-target" data-cursor="play">
        <canvas ref="sketch"></canvas>
        <figcaption class="mono">fig.01 — flow field / move your cursor inside</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.about {
  overflow: hidden;
}

.ghost {
  position: absolute;
  top: 4vh;
  right: -2vw;
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(120px, 22vw, 320px);
  text-transform: uppercase;
  -webkit-text-stroke-color: rgba(236, 234, 227, 0.07);
  pointer-events: none;
  user-select: none;
}

.grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 6vw;
  align-items: start;
}

.copy p {
  max-width: 540px;
  margin-bottom: 22px;
  color: var(--muted);
  font-size: 17px;
}

strong {
  color: var(--ink);
  font-weight: 600;
}

.facts {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  border-top: 1px solid var(--line);
}

.facts li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.facts .val {
  font-family: var(--display);
  font-weight: 700;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sketch-frame {
  margin: 0;
  border: 1px solid var(--line);
  padding: 14px;
}

.sketch-frame canvas {
  display: block;
  width: 100%;
  aspect-ratio: 1;
}

.sketch-frame figcaption {
  padding-top: 12px;
  color: var(--lime);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
