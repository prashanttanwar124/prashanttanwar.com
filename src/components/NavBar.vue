<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const nav = ref(null)
const bar = ref(null)

const links = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Experience', href: '#experience' },
  { n: '03', label: 'Works', href: '#projects' },
  { n: '04', label: 'Skills', href: '#skills' },
  { n: '05', label: 'Contact', href: '#contact' },
]

function onScroll() {
  const doc = document.documentElement
  const p = window.scrollY / Math.max(doc.scrollHeight - window.innerHeight, 1)
  if (bar.value) bar.value.style.transform = `scaleX(${p})`
}

onMounted(() => {
  gsap.from(nav.value, { y: -40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 2.3 })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div ref="bar" class="progress"></div>
  <nav ref="nav" class="nav">
    <a href="#home" class="logo">PT©</a>
    <div class="links">
      <a v-for="link in links" :key="link.href" :href="link.href">
        <sup>{{ link.n }}</sup> {{ link.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--lime);
  transform: scaleX(0);
  transform-origin: left;
  z-index: 101;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 6vw;
  mix-blend-mode: difference;
}

.logo {
  font-family: var(--display);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.05em;
  color: #fff;
}

.links {
  display: flex;
  gap: 34px;
}

.links a {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.links a:hover {
  opacity: 1;
}

.links sup {
  font-size: 9px;
  color: var(--lime);
}

@media (max-width: 760px) {
  .links {
    display: none;
  }
}
</style>
