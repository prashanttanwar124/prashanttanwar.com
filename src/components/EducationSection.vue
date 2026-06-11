<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)

const schools = [
  { n: '№ 01', degree: 'College Certificate', school: 'Conestoga College', rot: '-2deg' },
  { n: '№ 02', degree: 'Bachelor of Computer Application', school: 'Atharva Institute of Technology', rot: '1.4deg' },
  { n: '№ 03', degree: 'College Diploma', school: 'Jetking Computer Institute', rot: '-1deg' },
]

onMounted(() => {
  gsap.from(root.value.querySelectorAll('.stamp'), {
    scrollTrigger: { trigger: root.value, start: 'top 75%' },
    y: 80,
    opacity: 0,
    rotation: 6,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.4)',
  })
})
</script>

<template>
  <section id="education" ref="root">
    <div class="sec-head">
      <span class="sec-index">(05)</span>
      <h2 class="sec-title">Paper<br /><span class="outline">work</span></h2>
    </div>
    <div class="stamps">
      <article
        v-for="s in schools"
        :key="s.n"
        class="stamp hover-target"
        :style="{ '--rot': s.rot }"
      >
        <span class="mono num">{{ s.n }} — certified</span>
        <h3>{{ s.degree }}</h3>
        <p class="mono school">{{ s.school }}</p>
        <div class="barcode" aria-hidden="true"></div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.stamps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3vw;
}

.stamp {
  border: 1.5px dashed rgba(236, 234, 227, 0.4);
  padding: 30px 26px;
  transform: rotate(var(--rot));
  transition: transform 0.3s, border-color 0.3s, background 0.3s;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stamp:hover {
  transform: rotate(0deg) scale(1.03);
  border-color: var(--lime);
  background: rgba(204, 255, 0, 0.04);
}

.num {
  color: var(--lime);
}

.stamp h3 {
  font-size: 22px;
  font-weight: 800;
  flex: 1;
}

.school {
  color: var(--muted);
}

.barcode {
  height: 34px;
  background: repeating-linear-gradient(
    90deg,
    var(--ink) 0 2px,
    transparent 2px 5px,
    var(--ink) 5px 6px,
    transparent 6px 11px
  );
  opacity: 0.7;
}

@media (max-width: 860px) {
  .stamps {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
