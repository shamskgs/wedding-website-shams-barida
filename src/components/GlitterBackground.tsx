"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type GlitterBackgroundProps = {
  speed?: number;
  intensity?: number;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function createNoiseTexture() {
  const size = 128;
  const data = new Uint8Array(size * size);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function GlitterPlane({ speed, intensity }: Required<GlitterBackgroundProps>) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const reducedMotion = usePrefersReducedMotion();
  const hiddenRef = useRef(false);
  const elapsedRef = useRef(0);

  const noiseTexture = useMemo(() => createNoiseTexture(), []);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      uNoise: { value: noiseTexture },
      uIntensity: { value: intensity },
    }),
    [intensity, noiseTexture],
  );

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float iTime;
        uniform vec3 iResolution;
        uniform sampler2D uNoise;
        uniform float uIntensity;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float sparkleLayer(vec2 uv, float scale, float threshold, float twinkle) {
          vec2 grid = uv * scale;
          vec2 cell = floor(grid);
          vec2 local = fract(grid) - 0.5;
          float rnd = hash(cell);
          float sparse = step(threshold, rnd);
          float dist = length(local);
          float point = smoothstep(0.055, 0.0, dist);
          float cross = smoothstep(0.018, 0.0, abs(local.x)) * smoothstep(0.18, 0.0, abs(local.y));
          cross += smoothstep(0.018, 0.0, abs(local.y)) * smoothstep(0.18, 0.0, abs(local.x));
          float pulse = 0.52 + 0.48 * sin(iTime * twinkle + rnd * 18.849);
          return sparse * (point + cross * 0.28) * pulse;
        }

        void main() {
          vec2 uv = vUv;
          vec2 aspectUv = uv;
          aspectUv.x *= iResolution.x / max(iResolution.y, 1.0);

          float drift = iTime * 0.012;
          float noise = texture2D(uNoise, uv * 1.35 + vec2(drift, -drift * 0.7)).r;
          vec2 flow = vec2(noise * 0.018, -noise * 0.014);

          float fine = sparkleLayer(aspectUv + flow + vec2(iTime * 0.006, 0.0), 88.0, 0.976, 0.72);
          float near = sparkleLayer(aspectUv * 0.92 - flow + vec2(0.0, iTime * 0.004), 42.0, 0.958, 0.48);
          float dust = sparkleLayer(aspectUv + vec2(iTime * 0.002, -iTime * 0.003), 140.0, 0.992, 0.34);

          float vignette = smoothstep(0.95, 0.25, length(uv - 0.5));
          float result = (fine * 0.72 + near * 0.42 + dust * 0.24) * vignette;
          result = clamp(result, 0.0, 0.42);

          vec3 sparkleColor = vec3(0.83, 0.73, 0.53);
          vec3 plumLift = vec3(0.16, 0.10, 0.14) * result * 0.16;
          float alpha = result * 0.62;

          gl_FragColor = vec4(sparkleColor * result * uIntensity + plumLift, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
  }, [uniforms]);

  useEffect(() => {
    return () => {
      noiseTexture.dispose();
      material.dispose();
    };
  }, [material, noiseTexture]);

  useEffect(() => {
    const mat = materialRef.current;
    if (mat) mat.uniforms.uIntensity.value = intensity;
  }, [intensity]);

  useEffect(() => {
    const handleVisibility = () => {
      hiddenRef.current = document.hidden;
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat || reducedMotion || hiddenRef.current) return;
    elapsedRef.current += Math.min(delta, 0.045) * speed;
    mat.uniforms.iTime.value = elapsedRef.current;
  });

  useEffect(() => {
    const mat = materialRef.current;
    if (mat) mat.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
  }, [viewport.width, viewport.height]);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

export default function GlitterBackground({ speed = 0.28, intensity = 1.6 }: GlitterBackgroundProps) {
  return (
    <div className="glitter-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <GlitterPlane speed={speed} intensity={intensity} />
      </Canvas>
    </div>
  );
}
