import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'

/* ─── Starfield (the universe) ──────────────────────────────────────────────
   Crisp points scattered on a far shell — no additive "smoke", just deep space. */

const starVert = /* glsl */`
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    // very subtle mouse parallax
    pos.x += uMouse.x * 0.6;
    pos.y += uMouse.y * 0.6;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (260.0 / -mv.z);
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.2 + aPhase);
    vColor = aColor;
  }
`

const starFrag = /* glsl */`
  varying float vTwinkle;
  varying vec3 vColor;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    // soft round star with a tight core
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 1.6) * vTwinkle;
    gl_FragColor = vec4(vColor, alpha);
  }
`

const WHITE = new THREE.Color('#dfe6ff')
const BLUE = new THREE.Color('#7d9bff')
const WARM = new THREE.Color('#ff8c3a')

function Starfield({ count = 2600 }) {
  const matRef = useRef()
  const groupRef = useRef()
  const { mouse } = useThree()

  const [positions, sizes, phases, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const ph = new Float32Array(count)
    const col = new Float32Array(count * 3)
    const tmp = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // distribute on a thick far shell so points stay crisp (no overlap haze)
      const r = 26 + Math.random() * 48
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      sz[i] = Math.random() * Math.random() * 3.2 + 0.5
      ph[i] = Math.random() * Math.PI * 2

      // mostly white, some blue, a rare warm star
      const roll = Math.random()
      if (roll > 0.92) tmp.copy(WARM)
      else if (roll > 0.6) tmp.copy(BLUE)
      else tmp.copy(WHITE)
      col[i * 3] = tmp.r
      col[i * 3 + 1] = tmp.g
      col[i * 3 + 2] = tmp.b
    }
    return [pos, sz, ph, col]
  }, [count])

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime
      matRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y)
    }
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.008
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" array={sizes} count={count} itemSize={1} />
          <bufferAttribute attach="attributes-aPhase" array={phases} count={count} itemSize={1} />
          <bufferAttribute attach="attributes-aColor" array={colors} count={count} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={starVert}
          fragmentShader={starFrag}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
          uniforms={{
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2() },
          }}
        />
      </points>
    </group>
  )
}

/* ─── Camera Rig ───────────────────────────────────────────────────────── */
function CameraRig({ cameraStateRef }) {
  const { camera } = useThree()
  useFrame(() => {
    const s = cameraStateRef.current
    camera.position.lerp(s.position, 0.04)
    camera.lookAt(s.target.x, s.target.y, s.target.z)
  })
  return null
}

/* ─── Scene Orchestrator ───────────────────────────────────────────────── */
function SceneContent({ cameraStateRef }) {
  return (
    <>
      <Starfield />
      <CameraRig cameraStateRef={cameraStateRef} />
    </>
  )
}

/* ─── Main Canvas Export ───────────────────────────────────────────────── */
export default function Scene({ cameraStateRef }) {
  return (
    <div id="r3f-canvas">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 70 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#020205'))
        }}
      >
        <SceneContent cameraStateRef={cameraStateRef} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.7}
            luminanceSmoothing={0.85}
            intensity={0.35}
            kernelSize={KernelSize.MEDIUM}
            blendFunction={BlendFunction.ADD}
          />
          <Noise opacity={0.015} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
