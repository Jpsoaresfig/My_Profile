/*
 * Dependency-free WebGL starfield.
 *
 * Replaces three.js + react-three-fiber + postprocessing (~1 MB of JS) with a
 * single draw call. The camera glides between per-section keyframes as the page
 * scrolls, and the render loop adapts to the device:
 *   - fewer stars and a 30 fps cap on low-end / touch hardware
 *   - pauses entirely while the tab is hidden
 *   - renders on demand only (no loop) when the user prefers reduced motion
 */

const VERT = `
attribute vec3 aPos;
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTime;
uniform float uRot;
uniform vec2 uMouse;
uniform float uScale;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec3 p = aPos;
  p.xy += uMouse * 0.6;
  float c = cos(uRot), s = sin(uRot);
  p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  vec4 mv = uView * vec4(p, 1.0);
  gl_Position = uProj * mv;
  gl_PointSize = aSize * uScale / -mv.z;
  vAlpha = 0.55 + 0.45 * sin(uTime * 1.2 + aPhase);
  vColor = aColor;
}
`

const FRAG = `
precision mediump float;
varying float vAlpha;
varying vec3 vColor;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, pow(core, 1.6) * vAlpha);
}
`

const PALETTE = {
  white: [0.875, 0.902, 1.0],
  blue: [0.49, 0.608, 1.0],
  warm: [1.0, 0.549, 0.227],
}

// Camera position for each section (looking at the origin). The hero "dives"
// in towards the stars, then each section frames the field differently.
const KEYFRAMES = [
  { id: 'hero', pos: [0, 0, 7] },
  { id: 'about', pos: [0, 0.5, 4.5] },
  { id: 'experience', pos: [2, -1, 6] },
  { id: 'tech', pos: [0, 1, 8] },
  { id: 'projects', pos: [3, -1, 8] },
  { id: 'recommendations', pos: [-2, -1, 9] },
  { id: 'connect', pos: [0, 0, 18] },
]

/* ─── tiny mat4 helpers (column-major, like WebGL expects) ─────────────── */
function perspective(out, fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2)
  const nf = 1 / (near - far)
  out.fill(0)
  out[0] = f / aspect
  out[5] = f
  out[10] = (far + near) * nf
  out[11] = -1
  out[14] = 2 * far * near * nf
  return out
}

function lookAt(out, eye) {
  // target is always the origin, up is +Y
  let zx = eye[0], zy = eye[1], zz = eye[2]
  let len = Math.hypot(zx, zy, zz) || 1
  zx /= len; zy /= len; zz /= len
  // x = up × z
  let xx = zz, xy = 0, xz = -zx
  len = Math.hypot(xx, xz) || 1
  xx /= len; xz /= len
  // y = z × x
  const yx = zy * xz - zz * xy
  const yy = zz * xx - zx * xz
  const yz = zx * xy - zy * xx

  out[0] = xx; out[1] = yx; out[2] = zx; out[3] = 0
  out[4] = xy; out[5] = yy; out[6] = zy; out[7] = 0
  out[8] = xz; out[9] = yz; out[10] = zz; out[11] = 0
  out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2])
  out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2])
  out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2])
  out[15] = 1
  return out
}

const smoothstep = (t) => t * t * (3 - 2 * t)

function deviceTier() {
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const lowEnd = cores <= 4 || memory <= 2
  if (lowEnd) return { count: 900, maxDpr: 1, fpsCap: 30, coarse }
  if (coarse) return { count: 1500, maxDpr: 1.5, fpsCap: 60, coarse }
  return { count: 2600, maxDpr: 1.75, fpsCap: 0, coarse }
}

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error(log || 'shader compile failed')
  }
  return sh
}

/**
 * Mounts the starfield on `canvas`. Returns a cleanup function, or null when
 * WebGL is unavailable (the CSS background stays as the fallback).
 */
export function createStarfield(canvas) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
  })
  if (!gl) return null

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tier = deviceTier()

  let program
  try {
    program = gl.createProgram()
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  } catch {
    return null
  }
  gl.useProgram(program)

  /* ─── geometry: interleaved [x y z size phase r g b] ─── */
  const STRIDE = 8
  const n = tier.count
  const data = new Float32Array(n * STRIDE)
  for (let i = 0; i < n; i++) {
    // thick far shell so points stay crisp
    const r = 26 + Math.random() * 48
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const roll = Math.random()
    const col = roll > 0.92 ? PALETTE.warm : roll > 0.6 ? PALETTE.blue : PALETTE.white
    const o = i * STRIDE
    data[o] = r * Math.sin(phi) * Math.cos(theta)
    data[o + 1] = r * Math.sin(phi) * Math.sin(theta)
    data[o + 2] = r * Math.cos(phi)
    data[o + 3] = Math.random() * Math.random() * 3.2 + 0.5
    data[o + 4] = Math.random() * Math.PI * 2
    data[o + 5] = col[0]
    data[o + 6] = col[1]
    data[o + 7] = col[2]
  }

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

  const F = 4
  const attr = (name, size, offset) => {
    const loc = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, STRIDE * F, offset * F)
  }
  attr('aPos', 3, 0)
  attr('aSize', 1, 3)
  attr('aPhase', 1, 4)
  attr('aColor', 3, 5)

  const u = {
    proj: gl.getUniformLocation(program, 'uProj'),
    view: gl.getUniformLocation(program, 'uView'),
    time: gl.getUniformLocation(program, 'uTime'),
    rot: gl.getUniformLocation(program, 'uRot'),
    mouse: gl.getUniformLocation(program, 'uMouse'),
    scale: gl.getUniformLocation(program, 'uScale'),
  }

  gl.clearColor(0.008, 0.008, 0.02, 1)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const proj = new Float32Array(16)
  const view = new Float32Array(16)

  /* ─── sizing ─── */
  let dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, tier.maxDpr)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    perspective(proj, (70 * Math.PI) / 180, w / h, 0.1, 200)
    gl.uniformMatrix4fv(u.proj, false, proj)
    gl.uniform1f(u.scale, 260 * dpr)
    measure()
    requestDraw()
  }

  /* ─── scroll → camera keyframes ─── */
  let stops = []
  const measure = () => {
    stops = KEYFRAMES.map((k) => {
      const el = document.getElementById(k.id)
      return el ? { pos: k.pos, y: el.getBoundingClientRect().top + window.scrollY } : null
    }).filter(Boolean)
  }

  const desired = [0, 0, 7]
  const cam = [0, 0, 7]
  const computeDesired = () => {
    if (!stops.length) return
    const y = window.scrollY
    let i = 0
    while (i < stops.length - 1 && y >= stops[i + 1].y) i++
    const a = stops[i]
    const b = stops[Math.min(i + 1, stops.length - 1)]
    const span = b.y - a.y
    const t = span > 0 ? smoothstep(Math.min(Math.max((y - a.y) / span, 0), 1)) : 0
    for (let k = 0; k < 3; k++) desired[k] = a.pos[k] + (b.pos[k] - a.pos[k]) * t
  }

  /* ─── pointer parallax (mouse only) ─── */
  const mouseTarget = [0, 0]
  const mouse = [0, 0]
  const onPointer = (e) => {
    if (e.pointerType !== 'mouse') return
    mouseTarget[0] = (e.clientX / window.innerWidth) * 2 - 1
    mouseTarget[1] = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  /* ─── render ─── */
  const start = performance.now()
  let last = start
  let lastDraw = 0
  let raf = 0
  let running = false

  const draw = (now) => {
    const t = reducedMotion ? 0 : (now - start) / 1000
    gl.uniform1f(u.time, t)
    gl.uniform1f(u.rot, t * 0.008)
    gl.uniform2f(u.mouse, mouse[0], mouse[1])
    gl.uniformMatrix4fv(u.view, false, lookAt(view, cam))
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, n)
  }

  const frame = (now) => {
    raf = requestAnimationFrame(frame)
    if (tier.fpsCap && now - lastDraw < 1000 / tier.fpsCap - 1) return
    const dt = Math.min((now - last) / 1000, 0.1)
    last = now
    lastDraw = now

    computeDesired()
    const k = 1 - Math.exp(-dt * 2.4)
    for (let i = 0; i < 3; i++) cam[i] += (desired[i] - cam[i]) * k
    const m = 1 - Math.exp(-dt * 3)
    mouse[0] += (mouseTarget[0] - mouse[0]) * m
    mouse[1] += (mouseTarget[1] - mouse[1]) * m
    draw(now)
  }

  const startLoop = () => {
    if (running || reducedMotion) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stopLoop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  // Reduced motion: no loop, jump the camera and redraw only when needed.
  let pending = 0
  function requestDraw() {
    if (!reducedMotion || pending) return
    pending = requestAnimationFrame((now) => {
      pending = 0
      computeDesired()
      cam[0] = desired[0]; cam[1] = desired[1]; cam[2] = desired[2]
      draw(now)
    })
  }

  const onVisibility = () => (document.hidden ? stopLoop() : startLoop())
  const onContextLost = (e) => {
    e.preventDefault()
    stopLoop()
    canvas.style.opacity = '0'
  }

  let resizeRaf = 0
  const onResize = () => {
    cancelAnimationFrame(resizeRaf)
    resizeRaf = requestAnimationFrame(resize)
  }

  // Section heights change as fonts load / content reflows.
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { measure(); requestDraw() }) : null
  ro?.observe(document.body)

  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('scroll', requestDraw, { passive: true })
  if (!tier.coarse && !reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  canvas.addEventListener('webglcontextlost', onContextLost)

  resize()
  computeDesired()
  cam[0] = desired[0]; cam[1] = desired[1]; cam[2] = desired[2]
  draw(performance.now())
  if (!document.hidden) startLoop()

  return () => {
    stopLoop()
    cancelAnimationFrame(pending)
    cancelAnimationFrame(resizeRaf)
    ro?.disconnect()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', requestDraw)
    window.removeEventListener('pointermove', onPointer)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('webglcontextlost', onContextLost)
    gl.deleteBuffer(buf)
    gl.deleteProgram(program)
  }
}
