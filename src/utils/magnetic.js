import gsap from 'gsap'

// makes an element drift toward the cursor while hovered
export function magnetize(el, strength = 0.35) {
  const move = (e) => {
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
  }
  const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', leave)
  return () => {
    el.removeEventListener('mousemove', move)
    el.removeEventListener('mouseleave', leave)
  }
}
