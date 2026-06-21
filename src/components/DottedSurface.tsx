"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DottedSurface() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationId: number | null = null;
    let disposed = false;
    let pageVisible = !document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.innerWidth < 768;
    const amountX = isMobile ? 24 : 40;
    const amountY = isMobile ? 36 : 60;
    const count = amountX * amountY;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 1, 180);
    camera.position.set(0, 0, 76);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "dotted-surface-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 2);
    const pointColor = new THREE.Color("#5F655C");

    let index = 0;
    for (let y = 0; y < amountY; y += 1) {
      for (let x = 0; x < amountX; x += 1) {
        const offset = index * 3;
        const baseOffset = index * 2;
        const px = (x / (amountX - 1) - 0.5) * 86;
        const py = (y / (amountY - 1) - 0.5) * 112;
        positions[offset] = px;
        positions[offset + 1] = py;
        positions[offset + 2] = 0;
        basePositions[baseOffset] = px;
        basePositions[baseOffset + 1] = py;
        colors[offset] = pointColor.r;
        colors[offset + 1] = pointColor.g;
        colors[offset + 2] = pointColor.b;
        index += 1;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
      vertexColors: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    points.rotation.z = -0.08;
    scene.add(points);

    const updateWave = (elapsed: number) => {
      const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = positionAttribute.array as Float32Array;
      for (let i = 0; i < count; i += 1) {
        const offset = i * 3;
        const baseOffset = i * 2;
        const x = basePositions[baseOffset];
        const y = basePositions[baseOffset + 1];
        array[offset + 2] =
          Math.sin(x * 0.095 + elapsed * 0.34) * 2.2 +
          Math.cos(y * 0.075 - elapsed * 0.24) * 1.35;
      }
      positionAttribute.needsUpdate = true;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const renderFrame = (time: number) => {
      animationId = null;
      if (disposed || reducedMotion.matches || !pageVisible) return;
      updateWave(time * 0.001);
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (!disposed && !reducedMotion.matches && pageVisible && animationId === null) {
        animationId = window.requestAnimationFrame(renderFrame);
      }
    };

    const stopAnimation = () => {
      if (animationId !== null) {
        window.cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startAnimation();
      else stopAnimation();
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        stopAnimation();
        updateWave(0);
        renderer.render(scene, camera);
      } else {
        startAnimation();
      }
    };

    resize();
    if (reducedMotion.matches) {
      updateWave(0);
      renderer.render(scene, camera);
    } else {
      startAnimation();
    }

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      disposed = true;
      stopAnimation();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
