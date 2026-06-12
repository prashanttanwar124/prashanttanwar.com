<script setup>
const rows = [
  ['JavaScript', 'Vue.js', 'Laravel', 'Three.js', 'GSAP', 'MySQL', 'REST APIs'],
  ['Creative Coding', 'Generative Art', 'Canvas', 'UI Design', 'Web Animation'],
  ['Leadership', 'Team Management', 'Customer Service', 'Git', 'English'],
]
</script>

<template>
  <section id="skills" class="skills">
    <div class="sec-head">
      <span class="sec-index">(04)</span>
      <h2 class="sec-title">Tool<br /><span class="outline">box</span></h2>
      <span class="mono hint">( hover a row to freeze it )</span>
    </div>
    <div class="wall">
      <div
        v-for="(row, i) in rows"
        :key="i"
        class="row hover-target"
        :class="{ reverse: i % 2 === 1 }"
        data-cursor="freeze"
      >
        <div class="row-inner">
          <template v-for="n in 2" :key="n">
            <span v-for="word in row" :key="`${n}-${word}`" class="word hover-target">
              {{ word }}<i>✦</i>
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding-left: 0;
  padding-right: 0;
}

.sec-head {
  padding: 0 6vw;
}

.hint {
  color: var(--lime);
}

.wall {
  border-top: 1px solid var(--line);
}

.row {
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  padding: 2.4vh 0;
  white-space: nowrap;
}

.row-inner {
  display: inline-flex;
  width: max-content;
  animation: roll 30s linear infinite;
}

.row.reverse .row-inner {
  animation-direction: reverse;
}

.row:hover .row-inner {
  animation-play-state: paused;
}

.word {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(40px, 6.5vw, 92px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(236, 234, 227, 0.5);
  padding-right: 3vw;
  transition: color 0.25s, -webkit-text-stroke-color 0.25s;
}

.word:hover {
  color: var(--lime);
  -webkit-text-stroke-color: var(--lime);
}

.word i {
  font-style: normal;
  font-size: 0.4em;
  vertical-align: middle;
  color: var(--violet);
  -webkit-text-stroke: 0;
  padding-left: 3vw;
}

@keyframes roll {
  to {
    transform: translateX(-50%);
  }
}
</style>
