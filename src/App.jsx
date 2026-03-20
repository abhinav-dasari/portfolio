import React, { useState, useEffect, useRef } from 'react'
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import AboutMe from './component/AboutMe';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Certificates from './component/Certificates';
import Education from './component/Education';
import ContactMe from './component/ContactMe';
import assets from './assets/assets';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const colors = ['#5227FF', '#5421c7'];
    const baseSpring = 0.03, baseFriction = 0.9, baseThickness = 30;
    const offsetFactor = 0.05, maxAge = 500, pointCount = 50, speedMultiplier = 0.5;

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];

    const vertex = `
      precision highp float;
      attribute vec3 position; attribute vec3 next; attribute vec3 prev;
      attribute vec2 uv; attribute float side;
      uniform vec2 uResolution; uniform float uDPR; uniform float uThickness;
      varying vec2 vUV;
      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect; vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);
        float pixelWidth = current.w * (1.0 / (uResolution.y / uDPR));
        normal *= pixelWidth * uThickness;
        current.xy -= normal * side;
        return current;
      }
      void main() { vUV = uv; gl_Position = getPosition(); }
    `;
    const fragment = `
      precision highp float;
      uniform vec3 uColor; uniform float uOpacity;
      void main() { gl_FragColor = vec4(uColor, uOpacity); }
    `;

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach(l => l.polyline.resize());
    }
    window.addEventListener('resize', resize);

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const line = {
        spring: baseSpring + (Math.random() - 0.5) * 0.01,
        friction: baseFriction + (Math.random() - 0.5) * 0.01,
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3(
          (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.05, 0
        ),
        points: Array.from({ length: pointCount }, () => new Vec3())
      };
      line.polyline = new Polyline(gl, {
        points: line.points, vertex, fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness + (Math.random() - 0.5) * 3 },
          uOpacity: { value: 1.0 }
        }
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    resize();

    const mouse = new Vec3(0, 0, 0);
    const tmp = new Vec3();

    function updateMouse(e) {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.set((x / window.innerWidth) * 2 - 1, (y / window.innerHeight) * -2 + 1, 0);
    }
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchmove', updateMouse, { passive: true });

    let frameId;
    let lastTime = performance.now();
    function update() {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;
      lines.forEach(line => {
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);
        for (let i = 1; i < line.points.length; i++) {
          const segDelay = maxAge / (line.points.length - 1);
          line.points[i].lerp(line.points[i - 1], Math.min(1, (dt * speedMultiplier) / segDelay));
        }
        line.polyline.updateGeometry();
      });
      renderer.render({ scene });
    }
    update();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('touchmove', updateMouse);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div className='relative'>

      {/* Page background */}
      <div className="fixed inset-0 z-[-1] bg-white dark:bg-black" />

      {/* Site-wide OGL Ribbons effect */}
      <div ref={canvasContainerRef} className="fixed inset-0 z-0 w-screen h-screen overflow-hidden" />

      <div className="relative z-10">
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero theme={theme} setTheme={setTheme} />
        <AboutMe theme={theme} />
        <Skills theme={theme} />
        <Projects />
        <Certificates theme={theme} />
        <Education />
        <ContactMe theme={theme} />
      </div>
    </div>
  );
};

export default App;
