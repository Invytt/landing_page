"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* The hero's real 3D scene: a phone with thickness and a lit edge, turning
   with the pointer and the scroll, surrounded by drifting party shapes.
   Desktop only; the hero shows a CSS phone until (and unless) this is ready. */

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Flat rounded panel whose UVs run 0..1 across its bounds. */
function panel(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 24);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

const ease = (t: number) => 1 - Math.pow(1 - t, 4);

export default function HeroScene({
  texture,
  delay = 0,
  onReady,
  onFail,
}: {
  texture: string;
  /** seconds to wait before the phone flies in */
  delay?: number;
  onReady?: () => void;
  onFail?: () => void;
}) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      onFail?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    scene.add(new THREE.AmbientLight(0xfff1ea, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xd2402a, 60, 30);
    rim.position.set(-5, -1, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0xcdbef7, 30, 30);
    fill.position.set(5, -4, 2);
    scene.add(fill);

    /* ── phone ── */
    // same proportions as the flat phones (components/ui/phone.tsx):
    // 300 x 622 with a 22-deep frame and three side keys
    const W = 2.16;
    const H = 4.48;
    const BEVEL = 0.03;
    const D = (W * 22) / 300 - BEVEL * 2;
    const phone = new THREE.Group();

    const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(W, H, 0.38), {
      depth: D,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 8,
      curveSegments: 28,
    });
    bodyGeo.translate(0, 0, -D / 2);
    // the frame: dark brushed metal, like the flat phones' rim
    const metal = new THREE.MeshStandardMaterial({
      color: 0x6e4c4e,
      roughness: 0.28,
      metalness: 0.75,
    });
    phone.add(new THREE.Mesh(bodyGeo, metal));

    // side keys: two volume keys on the left, power on the right
    const KEY_OUT = (W * 4) / 300;
    const KEY_H = (W * 11) / 300;
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x8d6a6c, roughness: 0.22, metalness: 0.85 });
    const keys: [number, number, number][] = [
      [-1, 133, 26],
      [-1, 189, 46],
      [1, 185, 70],
    ];
    for (const [side, cy, len] of keys) {
      const l = (len / 622) * H;
      const g = new THREE.CapsuleGeometry(KEY_H / 2, Math.max(0.001, l - KEY_H), 6, 16);
      const k = new THREE.Mesh(g, keyMat);
      // a capsule stands along y; flatten it across x so it reads as a key
      k.scale.set((KEY_OUT * 2) / KEY_H, 1, 1);
      k.position.set(side * (W / 2 + BEVEL), H / 2 - (cy / 622) * H, 0);
      phone.add(k);
    }

    const face = D / 2 + BEVEL + 0.002;
    const inkMat = new THREE.MeshBasicMaterial({ color: 0x2b1719 });
    const bezel = new THREE.Mesh(panel(W - 0.06, H - 0.06, 0.35), inkMat);
    bezel.position.z = face;
    phone.add(bezel);

    const SW = W - 0.22;
    const SH = SW * (600 / 278);
    const tex = new THREE.TextureLoader().load(
      texture,
      () => onReady?.(),
      undefined,
      () => onFail?.(),
    );
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screen = new THREE.Mesh(
      panel(SW, SH, 0.29),
      new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
    );
    screen.position.z = face + 0.004;
    phone.add(screen);

    const island = new THREE.Mesh(panel(0.62, 0.17, 0.085), inkMat);
    island.position.set(0, SH / 2 - 0.19, face + 0.008);
    phone.add(island);

    // back: coral plate with a camera bump
    const backMat = new THREE.MeshStandardMaterial({ color: 0xd2402a, roughness: 0.55 });
    const back = new THREE.Mesh(panel(W - 0.06, H - 0.06, 0.35), backMat);
    back.rotation.y = Math.PI;
    back.position.z = -face;
    phone.add(back);
    const bump = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.08, 40),
      new THREE.MeshStandardMaterial({ color: 0x2b1719, roughness: 0.3, metalness: 0.5 }),
    );
    bump.rotation.x = Math.PI / 2;
    bump.position.set(0.5, H / 2 - 0.62, -face - 0.04);
    phone.add(bump);

    scene.add(phone);

    /* ── drifting party shapes ── */
    type Floaty = {
      mesh: THREE.Mesh;
      base: THREE.Vector3;
      amp: number;
      phase: number;
      spin: THREE.Vector3;
      depth: number;
    };
    const mat = (c: number, flat = false) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.45, metalness: 0.05, flatShading: flat });
    const defs: [THREE.BufferGeometry, THREE.Material, number, number, number, number][] = [
      [new THREE.TorusGeometry(0.42, 0.17, 20, 48), mat(0xd2402a), -2.55, 1.75, -0.6, 1.1],
      [new THREE.SphereGeometry(0.36, 32, 24), mat(0xcdbef7), 2.5, 2.05, -1.2, 0.8],
      [new THREE.ConeGeometry(0.32, 0.7, 28), mat(0x8fd9b6), 2.45, -1.75, 0.2, 1.3],
      [new THREE.IcosahedronGeometry(0.36, 0), mat(0xbfddfb, true), -2.5, -1.95, 0.1, 1.2],
      [new THREE.CapsuleGeometry(0.17, 0.5, 8, 20), mat(0xf6c1d0), -1.75, 2.65, -1.6, 0.6],
      [new THREE.OctahedronGeometry(0.3, 0), mat(0xffd6a5, true), 1.85, -2.6, -0.8, 0.9],
      [new THREE.SphereGeometry(0.14, 20, 16), mat(0xff9a5c), -3.2, 0.2, 0.6, 1.6],
      [new THREE.SphereGeometry(0.11, 20, 16), mat(0x3ccfbf), 3.25, 0.45, 0.8, 1.7],
      [new THREE.TorusGeometry(0.2, 0.08, 16, 32), mat(0xffd6a5), 1.5, 2.85, 0.3, 1.2],
    ];
    const floaties: Floaty[] = defs.map(([g, m, x, y, z, depth], i) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return {
        mesh,
        base: new THREE.Vector3(x, y, z),
        amp: 0.12 + (i % 3) * 0.06,
        phase: i * 1.7,
        spin: new THREE.Vector3(0.2 + (i % 4) * 0.12, 0.3 + (i % 3) * 0.15, 0.1),
        depth,
      };
    });

    /* ── input ── */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      // keep the phone the same visual height in narrow columns
      camera.position.z = w / h < 0.75 ? 11.5 + (0.75 - w / h) * 14 : 11.5;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    const began = performance.now();
    let raf = 0;
    let scroll = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = (performance.now() - began) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const target = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.9));
      scroll += (target - scroll) * 0.1;
      const intro = ease(Math.min(1, Math.max(0, t - delay) / 1.6));

      phone.rotation.y =
        -0.42 + pointer.x * 0.38 + scroll * 1.15 + (1 - intro) * -2.2;
      phone.rotation.x = 0.1 + pointer.y * 0.2 - scroll * 0.35;
      phone.rotation.z = 0.07 + Math.sin(t * 0.7) * 0.02 - scroll * 0.2;
      phone.position.y = Math.sin(t * 1.1) * 0.09 - (1 - intro) * 1.4 + scroll * 0.5;
      phone.position.x = pointer.x * 0.12;
      phone.scale.setScalar((0.72 + 0.28 * intro) * (1 - scroll * 0.12));

      for (const f of floaties) {
        const spread = 1 + scroll * 0.55;
        f.mesh.position.x = f.base.x * spread * intro + pointer.x * 0.28 * f.depth;
        f.mesh.position.y =
          f.base.y * spread * intro + Math.sin(t * 0.9 + f.phase) * f.amp - pointer.y * 0.22 * f.depth;
        f.mesh.position.z = f.base.z + scroll * f.depth;
        f.mesh.rotation.x = t * f.spin.x + f.phase;
        f.mesh.rotation.y = t * f.spin.y;
        f.mesh.rotation.z = t * f.spin.z;
        f.mesh.scale.setScalar(intro);
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry.dispose();
          const mm = m.material as THREE.Material | THREE.Material[];
          (Array.isArray(mm) ? mm : [mm]).forEach((x) => x.dispose());
        }
      });
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // run once: props are stable for the lifetime of the hero
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mount} aria-hidden className="absolute inset-0" />;
}
