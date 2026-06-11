<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

// One fixed WebGL canvas behind the whole page. The camera descends through
// a 3D world as you scroll: laptop in the hero, wireframe relics floating
// past each section, particles shifting violet -> lime on the way down.

const host = ref(null)

const WORLD_DEPTH = 46

let renderer, scene, camera, particles, laptop, hinge, screenTex, rafId
let shapes = []
let mouseX = 0
let mouseY = 0
let typed = 0

const CODE = [
  [
    { t: 'import ', c: '#c792ea' },
    { t: '{ ref, onMounted } ', c: '#e4e4f0' },
    { t: 'from ', c: '#c792ea' },
    { t: "'vue'", c: '#c3e88d' },
  ],
  [
    { t: 'import ', c: '#c792ea' },
    { t: 'gsap ', c: '#e4e4f0' },
    { t: 'from ', c: '#c792ea' },
    { t: "'gsap'", c: '#c3e88d' },
  ],
  [{ t: '', c: '#fff' }],
  [
    { t: 'const ', c: '#c792ea' },
    { t: 'portfolio ', c: '#82aaff' },
    { t: '= ', c: '#89ddff' },
    { t: '() ', c: '#e4e4f0' },
    { t: '=> ', c: '#c792ea' },
    { t: '{', c: '#ffcb6b' },
  ],
  [
    { t: '  const ', c: '#c792ea' },
    { t: 'dev ', c: '#82aaff' },
    { t: '= ', c: '#89ddff' },
    { t: "'Prashant Tanwar'", c: '#c3e88d' },
  ],
  [
    { t: '  const ', c: '#c792ea' },
    { t: 'skills ', c: '#82aaff' },
    { t: '= [', c: '#89ddff' },
    { t: "'js'", c: '#c3e88d' },
    { t: ', ', c: '#89ddff' },
    { t: "'vue'", c: '#c3e88d' },
    { t: ', ', c: '#89ddff' },
    { t: "'three'", c: '#c3e88d' },
    { t: ']', c: '#89ddff' },
  ],
  [{ t: '', c: '#fff' }],
  [
    { t: '  gsap', c: '#82aaff' },
    { t: '.', c: '#89ddff' },
    { t: 'to', c: '#ffcb6b' },
    { t: '(dream, {', c: '#e4e4f0' },
  ],
  [
    { t: '    status: ', c: '#f78c6c' },
    { t: "'shipped'", c: '#c3e88d' },
    { t: ',', c: '#89ddff' },
  ],
  [
    { t: '    ease: ', c: '#f78c6c' },
    { t: "'power3.out'", c: '#c3e88d' },
    { t: ',', c: '#89ddff' },
  ],
  [{ t: '  })', c: '#e4e4f0' }],
  [{ t: '}', c: '#ffcb6b' }],
]

const TOTAL_CHARS = CODE.reduce(
  (sum, line) => sum + line.reduce((s, tok) => s + tok.t.length, 0),
  0
)

function drawScreen(ctx, canvas, chars) {
  ctx.fillStyle = '#0d0d16'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const dots = ['#ff5f57', '#febc2e', '#28c840']
  dots.forEach((c, i) => {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(22 + i * 20, 18, 5, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath()
  ctx.moveTo(0, 34)
  ctx.lineTo(canvas.width, 34)
  ctx.stroke()

  ctx.font = '15px Menlo, monospace'
  let remaining = chars
  let cursorX = 46
  let cursorY = 62
  CODE.forEach((line, li) => {
    const y = 62 + li * 23
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.fillText(String(li + 1), 14, y)
    let x = 46
    line.forEach((tok) => {
      if (remaining <= 0) return
      const slice = tok.t.slice(0, remaining)
      ctx.fillStyle = tok.c
      ctx.fillText(slice, x, y)
      x += ctx.measureText(slice).width
      remaining -= tok.t.length
      if (remaining >= 0) {
        cursorX = x
        cursorY = y
      }
    })
  })
  if (Math.floor(performance.now() / 500) % 2 === 0) {
    ctx.fillStyle = '#ccff00'
    ctx.fillRect(cursorX + 2, cursorY - 13, 8, 16)
  }
}

function buildLaptop() {
  const group = new THREE.Group()
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x16161c,
    roughness: 0.4,
    metalness: 0.7,
  })

  group.add(new THREE.Mesh(new THREE.BoxGeometry(3, 0.12, 2), bodyMat))

  const kbCanvas = document.createElement('canvas')
  kbCanvas.width = 256
  kbCanvas.height = 160
  const kctx = kbCanvas.getContext('2d')
  kctx.fillStyle = '#101016'
  kctx.fillRect(0, 0, 256, 160)
  for (let r = 0; r < 5; r++) {
    for (let k = 0; k < 13; k++) {
      kctx.fillStyle = '#1d1d26'
      kctx.fillRect(8 + k * 19, 10 + r * 22, 15, 16)
    }
  }
  kctx.fillRect(78, 122, 100, 30)
  const keyboard = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 1.8),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(kbCanvas), roughness: 0.8 })
  )
  keyboard.rotation.x = -Math.PI / 2
  keyboard.position.y = 0.065
  group.add(keyboard)

  hinge = new THREE.Group()
  hinge.position.set(0, 0.06, -1)
  group.add(hinge)

  const lid = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 0.08), bodyMat)
  lid.position.y = 1
  hinge.add(lid)

  const screenCanvas = document.createElement('canvas')
  screenCanvas.width = 512
  screenCanvas.height = 330
  const sctx = screenCanvas.getContext('2d')
  drawScreen(sctx, screenCanvas, 0)
  screenTex = new THREE.CanvasTexture(screenCanvas)
  screenTex.colorSpace = THREE.SRGBColorSpace
  screenTex.userData = { ctx: sctx, canvas: screenCanvas }

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 1.8),
    new THREE.MeshBasicMaterial({ map: screenTex })
  )
  screen.position.set(0, 1, 0.045)
  hinge.add(screen)

  hinge.rotation.x = 1.45
  return group
}

function addShape(geometry, color, x, y, z, speed) {
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.22 })
  )
  mesh.position.set(x, y, z)
  mesh.userData.speed = speed
  scene.add(mesh)
  shapes.push(mesh)
}

function onPointerMove(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 7)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  host.value.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const key = new THREE.DirectionalLight(0xffffff, 1.2)
  key.position.set(-3, 4, 5)
  scene.add(key)
  const glow = new THREE.PointLight(0xccff00, 5, 12)
  glow.position.set(2.2, 0.5, 2)
  scene.add(glow)

  // particle column spanning the whole journey
  const count = 2600
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26
    positions[i * 3 + 1] = 8 - Math.random() * (WORLD_DEPTH + 16)
    positions[i * 3 + 2] = -8 + Math.random() * 11
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const pMat = new THREE.PointsMaterial({
    color: 0x7c6cff,
    size: 0.03,
    transparent: true,
    opacity: 0.85,
  })
  particles = new THREE.Points(geometry, pMat)
  scene.add(particles)

  // relics floating past each section
  addShape(new THREE.TorusKnotGeometry(1.1, 0.3, 90, 12), 0xccff00, -3, -7, -2, 0.3)
  addShape(new THREE.IcosahedronGeometry(1.5, 1), 0x7c6cff, 3, -15, -2.5, 0.2)
  addShape(new THREE.TorusGeometry(1.4, 0.4, 10, 40), 0xccff00, -2.6, -23, -2, 0.25)
  addShape(new THREE.DodecahedronGeometry(1.4, 0), 0x7c6cff, 2.8, -31, -2, 0.18)
  addShape(new THREE.OctahedronGeometry(1.3, 0), 0xccff00, -2.8, -38, -2.2, 0.28)
  addShape(new THREE.SphereGeometry(2.4, 18, 14), 0x7c6cff, 0, -45, -4, 0.1)

  laptop = buildLaptop()
  laptop.position.set(2.0, -1.4, 0)
  laptop.rotation.y = -0.45
  laptop.scale.setScalar(0.85)
  scene.add(laptop)

  gsap.to(hinge.rotation, { x: -0.18, duration: 1.6, ease: 'power3.inOut', delay: 2.4 })

  const colorA = new THREE.Color(0x7c6cff)
  const colorB = new THREE.Color(0xccff00)
  const start = performance.now()

  const animate = () => {
    const t = (performance.now() - start) / 1000
    const doc = document.documentElement
    const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1)
    const progress = Math.min(window.scrollY / maxScroll, 1)

    const targetY = -progress * WORLD_DEPTH
    camera.position.y += (targetY - camera.position.y) * 0.07
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.04
    camera.lookAt(0, camera.position.y, 0)

    pMat.color.lerpColors(colorA, colorB, progress)
    particles.rotation.y = t * 0.02 + mouseX * 0.05

    shapes.forEach((s) => {
      s.rotation.x = t * s.userData.speed
      s.rotation.y = t * s.userData.speed * 1.4
    })

    laptop.position.y = -1.4 + Math.sin(t * 0.8) * 0.1
    laptop.rotation.y = -0.45 + mouseX * 0.1
    if (camera.position.y > -6) {
      typed = typed < TOTAL_CHARS + 120 ? typed + 0.6 : 0
      drawScreen(screenTex.userData.ctx, screenTex.userData.canvas, Math.floor(typed))
      screenTex.needsUpdate = true
    }

    renderer.render(scene, camera)
    rafId = requestAnimationFrame(animate)
  }
  animate()

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (obj.material.map) obj.material.map.dispose()
      obj.material.dispose()
    }
  })
  renderer.dispose()
})
</script>

<template>
  <div ref="host" class="world"></div>
</template>

<style scoped>
.world {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.world :deep(canvas) {
  display: block;
}
</style>
