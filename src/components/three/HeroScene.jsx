import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

/* ==========================================================================
   HERO SCENE — "THE STRAND"
   A single lock of hair, rendered in champagne gold and lit like the real
   thing: a flat, tapered ribbon with fabric sheen, twisting as it falls.

   The canvas is genuinely transparent so the studio photograph reads
   through it — the 3D layer is atmosphere and depth, never a curtain.
   ========================================================================== */

const GOLD = '#d4af37'
const GOLD_LIGHT = '#f4e6bd'
const EMBER = '#8a6a1f'

/**
 * The authored fall of the lock: a long, vertical drape with a gentle S,
 * the way a cut hangs when it is released. Centred on the origin so the
 * rig can place it in the right third at any aspect ratio.
 */
const STRAND_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0.45, 3.5, 0.35),
    new THREE.Vector3(-0.55, 2.05, -0.25),
    new THREE.Vector3(0.62, 0.6, 0.3),
    new THREE.Vector3(-0.5, -0.85, -0.3),
    new THREE.Vector3(0.55, -2.35, 0.25),
    new THREE.Vector3(-0.2, -3.6, -0.1)
  ],
  false,
  'catmullrom',
  0.5
)

/** A finer lock behind it, further back and slightly out of phase. */
const STRAND_CURVE_2 = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(1.15, 3.7, -1.9),
    new THREE.Vector3(0.35, 1.9, -2.15),
    new THREE.Vector3(1.35, 0.1, -1.95),
    new THREE.Vector3(0.45, -1.75, -2.2),
    new THREE.Vector3(1.1, -3.7, -1.95)
  ],
  false,
  'catmullrom',
  0.5
)

/**
 * Builds a tapered, twisted ribbon along a curve — the cross-section is a
 * flat ellipse that rotates as it travels, so the lock catches light on
 * its face the way real hair does. This is the difference between a
 * glowing tube and a lock of hair.
 */
function buildLockGeometry(curve, { width, thickness, segments = 260, radial = 12 }) {
  const frames = curve.computeFrenetFrames(segments, false)
  const positions = []
  const normals = []
  const uvs = []
  const indices = []
  const P = new THREE.Vector3()
  const N = new THREE.Vector3()
  const B = new THREE.Vector3()

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    curve.getPointAt(t, P)
    N.copy(frames.normals[i])
    B.copy(frames.binormals[i])

    // Taper toward both ends, like a cut that thins toward the tip.
    const taper = Math.sin(Math.PI * Math.pow(t, 0.9))
    const w = width * (0.35 + 0.65 * taper)
    const th = thickness * (0.3 + 0.7 * taper)
    const twist = t * Math.PI * 0.6

    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2
      const cx = Math.cos(a) * w
      const cy = Math.sin(a) * th
      const rx = cx * Math.cos(twist) - cy * Math.sin(twist)
      const ry = cx * Math.sin(twist) + cy * Math.cos(twist)

      positions.push(
        P.x + N.x * rx + B.x * ry,
        P.y + N.y * rx + B.y * ry,
        P.z + N.z * rx + B.z * ry
      )

      const nx = (N.x * Math.cos(a)) / w + (B.x * Math.sin(a)) / th
      const ny = (N.y * Math.cos(a)) / w + (B.y * Math.sin(a)) / th
      const nz = (N.z * Math.cos(a)) / w + (B.z * Math.sin(a)) / th
      const len = Math.hypot(nx, ny, nz) || 1
      normals.push(nx / len, ny / len, nz / len)
      uvs.push(t, j / radial)
    }
  }

  const stride = radial + 1
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * stride + j
      const b = a + stride
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setIndex(indices)
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.computeBoundingSphere()
  return geo
}

/** Slow-drifting motes of gold dust — the salon atmosphere made literal. */
function GoldDust({ count = 130 }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    const p = pointsRef.current
    if (!p) return
    const t = state.clock.getElapsedTime()
    p.rotation.y = t * 0.012
    p.rotation.x = Math.sin(t * 0.1) * 0.04
    const pos = p.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      let y = pos.array[i * 3 + 1] + 0.0012
      if (y > 4) y = -4
      pos.array[i * 3 + 1] = y
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color={GOLD_LIGHT}
        transparent
        opacity={0.36}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * The lock itself. Gold metal with fabric sheen, lit by the studio rig —
 * the same way a highlight reads on real hair.
 */
function Lock({ curve, width, thickness, phase = 0, speed = 1, emissive = 0.1 }) {
  const meshRef = useRef(null)
  const matRef = useRef(null)
  const geometry = useMemo(
    () => buildLockGeometry(curve, { width, thickness }),
    [curve, width, thickness]
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const m = meshRef.current
    if (m) {
      m.rotation.z = Math.sin(t * 0.13 * speed + phase) * 0.05
      m.rotation.y = Math.sin(t * 0.09 * speed + phase) * 0.16
      m.position.y = Math.sin(t * 0.34 * speed + phase) * 0.14
    }
    if (matRef.current) {
      // A slow shimmer travelling the length of the lock.
      matRef.current.emissiveIntensity =
        emissive + Math.sin(t * 0.9 * speed + phase) * 0.035
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        ref={matRef}
        color={GOLD}
        metalness={0.55}
        roughness={0.26}
        sheen={1}
        sheenColor={GOLD_LIGHT}
        sheenRoughness={0.34}
        clearcoat={0.6}
        clearcoatRoughness={0.28}
        emissive={EMBER}
        emissiveIntensity={emissive}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * Frames the lock to the viewport at any aspect ratio.
 *
 * Wide (landscape): the lock is large, hangs from the top edge, and sits
 * hard against the right third — the headline column is entirely clear.
 *
 * Portrait (phones, tablets): the type column spans the full width, so a
 * centred lock would run straight through the headline and deck. There the
 * lock is scaled down and pushed to the right edge, reading as a lit
 * vertical edge in the composition rather than a subject in the copy.
 */
function LockRig() {
  const groupRef = useRef(null)
  const { viewport, size } = useThree()

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    const t = state.clock.getElapsedTime()
    const aspect = size.width / size.height
    const wide = aspect > 1.05
    // Tablet portrait: the nav's Reserve button occupies the top right, so
    // the strand hangs further left where the header is empty.
    const tablet = !wide && aspect > 0.62

    // The authored curve spans 7.1 units of height. Landscape fills about
    // four-fifths of the frame. Portrait shrinks it to a corner accent —
    // the type column owns the whole frame there, so the lock reads as
    // atmosphere above the copy, not a subject in front of it.
    const targetScale = wide
      ? viewport.height / 9
      : tablet
        ? viewport.height / 12
        : viewport.height / 15
    g.scale.x = THREE.MathUtils.damp(g.scale.x, targetScale, 3, delta)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x

    g.position.x = THREE.MathUtils.damp(
      g.position.x,
      wide
        ? viewport.width * 0.36
        : tablet
          ? viewport.width * 0.22
          : viewport.width * 0.3,
      3,
      delta
    )
    // Hang from above the top edge, well clear of the nav and headline.
    g.position.y = THREE.MathUtils.damp(
      g.position.y,
      viewport.height * (wide ? 0.36 : tablet ? 0.46 : 0.5) +
        Math.sin(t * 0.26) * 0.05,
      3,
      delta
    )
  })

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.35}>
        <Lock
          curve={STRAND_CURVE}
          width={0.135}
          thickness={0.018}
          phase={0}
          speed={1}
          emissive={0.14}
        />
      </Float>
      <Float speed={0.6} rotationIntensity={0.06} floatIntensity={0.28}>
        <Lock
          curve={STRAND_CURVE_2}
          width={0.07}
          thickness={0.011}
          phase={2.1}
          speed={0.7}
          emissive={0.08}
        />
      </Float>
    </group>
  )
}

/** Camera rig: a slow, damped drift — the room breathes. */
function CameraRig() {
  const { camera, pointer } = useThree()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const targetX = pointer.x * 0.26 + Math.sin(t * 0.16) * 0.2
    const targetY = pointer.y * 0.14 + Math.cos(t * 0.2) * 0.12
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.2, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.6, 2.2, delta)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Studio lighting rig built entirely from Drei Lightformers — rectangular
 * champagne softboxes reflected in the lock's surface.
 */
function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.24} color="#2f3550" />
      <directionalLight position={[4, 5, 4]} intensity={1.1} color={GOLD_LIGHT} />
      <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#5a6690" />
      <pointLight position={[0, 0.4, 2.6]} intensity={7} distance={12} color={GOLD} />

      <Environment resolution={256} frames={1}>
        {/* Key softbox — warm champagne */}
        <Lightformer
          form="rect"
          intensity={6}
          color={GOLD_LIGHT}
          position={[-2.6, 1.6, 3.2]}
          scale={[5, 3.4, 1]}
          target={[0, 0, 0]}
        />
        {/* Rim strip — cool, for edge definition */}
        <Lightformer
          form="rect"
          intensity={3.4}
          color="#6a76c4"
          position={[3.4, 0.4, -2.4]}
          scale={[4.2, 0.5, 1]}
          target={[0, 0, 0]}
        />
        {/* Overhead champagne wash */}
        <Lightformer
          form="circle"
          intensity={4}
          color={GOLD}
          position={[0, 4.2, 0.6]}
          scale={[3.2, 3.2, 1]}
          target={[0, 0, 0]}
        />
        {/* Floor bounce */}
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#3a4468"
          position={[0, -3, 1]}
          scale={[7, 3, 1]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  )
}

function SceneContents() {
  return (
    <>
      <CameraRig />
      <StudioLights />
      <LockRig />
      <GoldDust />
    </>
  )
}

/**
 * The hero's 3D layer — a transparent WebGL pane over the studio
 * photograph, so the photography stays legible while the lock adds
 * genuine spatial depth and shimmer.
 */
export default function HeroScene({ enabled = true }) {
  if (!enabled) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 u-scene-veil"
      aria-hidden="true"
      data-testid="hero-scene"
    >
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.15
          gl.setClearColor(0x000000, 0)
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContents />
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.8}
              luminanceSmoothing={0.3}
              mipmapBlur
              radius={0.55}
            />
            <Vignette eskil={false} offset={0.44} darkness={0.4} />
            <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.07} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
