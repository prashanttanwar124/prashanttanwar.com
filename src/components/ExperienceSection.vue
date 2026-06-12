<script setup>
const jobs = [
  {
    n: '01',
    role: 'Full Stack Developer',
    company: 'Brandshark',
    period: '2021 →',
    desc: 'Web services, APIs and interfaces end-to-end. MySQL to pixel-perfect UI, for real clients with real deadlines.',
    rotate: '-1.2deg',
  },
  {
    n: '02',
    role: 'POS Developer & Store Operations',
    company: 'Maniratn Jewellers',
    period: 'retail + code',
    desc: 'Ran stock and kept customers happy — then built the store its own point-of-sale software: billing, inventory and daily reports, still in use on the shop floor.',
    rotate: '1deg',
  },
]
</script>

<template>
  <section id="experience" class="exp">
    <div class="sec-head">
      <span class="sec-index">(02)</span>
      <h2 class="sec-title">Career<br /><span class="outline">log</span></h2>
    </div>
    <div class="deck">
      <article
        v-for="job in jobs"
        :key="job.n"
        class="exp-card hover-target"
        :style="{ '--rot': job.rotate }"
      >
        <span class="big-n outline" aria-hidden="true">{{ job.n }}</span>
        <div class="head">
          <h3>{{ job.role }}</h3>
          <span class="mono period">[ {{ job.period }} ]</span>
        </div>
        <p class="company">@ {{ job.company }}</p>
        <p class="desc">{{ job.desc }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.deck {
  display: flex;
  flex-direction: column;
}

.exp-card {
  position: sticky;
  top: 14vh;
  background: #0a0a0a;
  border: 1px solid var(--line);
  padding: 5vh 5vw;
  margin-bottom: 8vh;
  transform: rotate(var(--rot));
  transition: border-color 0.3s;
  overflow: hidden;
}

.exp-card:hover {
  border-color: var(--lime);
}

.big-n {
  position: absolute;
  top: -2vh;
  right: 2vw;
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(100px, 14vw, 200px);
  -webkit-text-stroke-color: rgba(236, 234, 227, 0.12);
  pointer-events: none;
}

.head {
  display: flex;
  align-items: baseline;
  gap: 24px;
  flex-wrap: wrap;
}

.head h3 {
  font-size: clamp(24px, 3.4vw, 44px);
  font-weight: 800;
}

.period {
  color: var(--lime);
}

.company {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 12px 0 20px;
}

.desc {
  max-width: 520px;
  color: var(--muted);
  font-size: 17px;
}
</style>
