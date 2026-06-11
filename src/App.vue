<script setup>
import { ref } from 'vue'
import Preloader from './components/Preloader.vue'
import CustomCursor from './components/CustomCursor.vue'
import WorldCanvas from './components/WorldCanvas.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'

const loaded = ref(false)
</script>

<template>
  <Preloader v-if="!loaded" @finished="loaded = true" />
  <CustomCursor />
  <WorldCanvas />
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </main>
  <div class="grain"></div>
</template>
