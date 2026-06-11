<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { magnetize } from '../utils/magnetic'
import MarqueeStrip from './MarqueeStrip.vue'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
const mailBtn = ref(null)

const words = ["LET'S", 'TALK']

function pop(e) {
  gsap.to(e.target, {
    y: -22,
    rotation: gsap.utils.random(-14, 14),
    duration: 0.18,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
    overwrite: true,
  })
}

onMounted(() => {
  magnetize(mailBtn.value, 0.25)
  gsap.from(root.value.querySelectorAll('.reveal'), {
    scrollTrigger: { trigger: root.value, start: 'top 70%' },
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
  })
})
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <span class="sec-index reveal">(06) — transmission open</span>
    <h2 class="shout reveal" aria-label="Let's talk">
      <span v-for="(word, wi) in words" :key="wi" class="word">
        <span
          v-for="(ch, ci) in word.split('')"
          :key="ci"
          class="ch hover-target"
          @mouseenter="pop"
          >{{ ch }}</span
        >
      </span>
    </h2>
    <p class="reveal lead">
      Open to web developer roles &amp; freelance experiments.
      The inbox is warm.
    </p>
    <a
      ref="mailBtn"
      href="mailto:prashanttanwar124@gmail.com"
      class="pill pill-solid reveal"
      data-cursor="send"
    >
      prashanttanwar124@gmail.com
    </a>
    <MarqueeStrip
      class="foot-marquee"
      :items="['© 2026 Prashant Tanwar', 'Built with Vue + GSAP + Three.js', 'No templates harmed']"
      reverse
    />
  </section>
</template>

<style scoped>
.contact {
  text-align: center;
  padding-bottom: 0;
}

.shout {
  font-size: clamp(64px, 14vw, 210px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 4vh 0;
  display: flex;
  justify-content: center;
  gap: 0.25em;
  flex-wrap: wrap;
}

.word {
  display: inline-flex;
}

.ch {
  display: inline-block;
  transition: color 0.2s;
}

.ch:hover {
  color: var(--lime);
}

.lead {
  color: var(--muted);
  max-width: 380px;
  margin: 0 auto 5vh;
  font-size: 17px;
}

.foot-marquee {
  margin-top: 14vh;
}
</style>
