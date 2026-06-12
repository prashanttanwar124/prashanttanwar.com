<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
const track = ref(null)

// Add your projects here — set `link` / `repo` to real URLs (or leave '' to hide)
const projects = [
  {
    n: '01',
    title: 'Aomclinic',
    subtitle: 'appointment booking app',
    tags: ['Laravel', 'Vue', 'MySQL'],
    desc: 'A clinic booking platform with two faces. Patients browse doctors and grab a slot in seconds; the clinic gets an admin side to manage doctors, schedules and every appointment of the day. Laravel powers the API, Vue keeps the front end snappy.',
    link: '',
    repo: '',
  },
  {
    n: '02',
    title: 'Maniratn POS',
    subtitle: 'point of sale, built in-house',
    tags: ['JavaScript', 'MySQL', 'Billing'],
    desc: 'Point-of-sale software I built for Maniratn Jewellers — billing, live inventory and end-of-day reports for a busy jewellery counter. I had worked that counter myself, so I knew exactly where software needed to be fast and forgiving.',
    link: '',
    repo: '',
  },
  {
    n: '03',
    title: '3D Portfolio',
    subtitle: 'this very site',
    tags: ['Vue 3', 'Three.js', 'GSAP'],
    desc: 'A scroll-through 3D world with a code-typing laptop, kinetic type and one suspicious lime accent.',
    link: '',
    repo: '',
  },
  {
    n: '04',
    title: 'Brand Sites',
    subtitle: 'Brandshark era',
    tags: ['JavaScript', 'MySQL', 'REST'],
    desc: 'Full-stack brand websites — responsive UI, custom APIs and MySQL-backed admin panels.',
    link: '',
    repo: '',
  },
]

let mm

onMounted(() => {
  mm = gsap.matchMedia()
  mm.add('(min-width: 861px)', () => {
    const distance = () => track.value.scrollWidth - window.innerWidth
    gsap.to(track.value, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => '+=' + distance(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    })
  })
})

onBeforeUnmount(() => mm?.revert())
</script>

<template>
  <section id="projects" ref="root" class="projects">
    <div class="track" ref="track">
      <div class="panel intro">
        <span class="sec-index">(03)</span>
        <h2 class="sec-title">Selected<br /><span class="outline">works</span></h2>
        <p class="mono drag-hint">keep scrolling — gallery moves sideways →</p>
      </div>
      <article v-for="p in projects" :key="p.n" class="panel proj hover-target" data-cursor="view">
        <span class="proj-n outline">{{ p.n }}</span>
        <div class="proj-body">
          <p class="mono subtitle">{{ p.subtitle }}</p>
          <h3>{{ p.title }}</h3>
          <p class="desc">{{ p.desc }}</p>
          <div class="tags">
            <span v-for="tag in p.tags" :key="tag" class="mono tag">{{ tag }}</span>
          </div>
          <div v-if="p.link || p.repo" class="actions">
            <a v-if="p.link" :href="p.link" target="_blank" rel="noopener" class="pill">Live ↗</a>
            <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener" class="pill">Code ↗</a>
          </div>
        </div>
      </article>
      <div class="panel outro">
        <p class="outline big">More soon</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 0;
  overflow: hidden;
}

.track {
  display: flex;
  height: 100vh;
  width: max-content;
}

.panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
  flex-shrink: 0;
}

.intro {
  width: 60vw;
}

.drag-hint {
  margin-top: 5vh;
  color: var(--lime);
}

.proj {
  width: 56vw;
  border-left: 1px solid var(--line);
  position: relative;
  transition: background 0.4s;
}

.proj:hover {
  background: rgba(204, 255, 0, 0.04);
}

.proj-n {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(80px, 11vw, 170px);
  -webkit-text-stroke-color: rgba(236, 234, 227, 0.18);
  line-height: 1;
  transition: -webkit-text-stroke-color 0.4s;
}

.proj:hover .proj-n {
  -webkit-text-stroke-color: var(--lime);
}

.subtitle {
  color: var(--lime);
  margin: 3vh 0 10px;
}

.proj h3 {
  font-size: clamp(34px, 4.6vw, 64px);
  font-weight: 800;
  margin-bottom: 20px;
}

.desc {
  max-width: 420px;
  color: var(--muted);
  font-size: 16px;
  margin-bottom: 24px;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 14px;
  color: var(--ink);
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 26px;
}

.actions .pill {
  padding: 12px 26px;
}

.outro {
  width: 50vw;
  align-items: center;
}

.big {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(50px, 7vw, 110px);
  text-transform: uppercase;
  -webkit-text-stroke-color: rgba(236, 234, 227, 0.25);
}

@media (max-width: 860px) {
  .projects {
    padding: 18vh 0;
  }

  .track {
    flex-direction: column;
    height: auto;
    width: 100%;
  }

  .panel {
    width: 100%;
    height: auto;
    padding: 10vh 6vw;
  }

  .proj {
    border-left: none;
    border-top: 1px solid var(--line);
  }
}
</style>
