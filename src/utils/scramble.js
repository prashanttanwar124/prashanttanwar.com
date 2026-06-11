const CHARS = '!<>-_\\/[]{}—=+*^?#____'

// progressively decodes `finalText` into `el`, glitch-style
export function scramble(el, finalText, duration = 1000) {
  const start = performance.now()
  let raf
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const locked = Math.floor(finalText.length * progress)
    let out = finalText.slice(0, locked)
    for (let i = locked; i < finalText.length; i++) {
      out += finalText[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
    }
    el.textContent = out
    if (progress < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}
