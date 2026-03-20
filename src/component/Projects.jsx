import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import assets from '../assets/assets';
import GlassIcons from '../components/GlassIcons';
import { Code, Database, Monitor, Cpu, Box, Cloud, Settings, Layers, Hash } from 'lucide-react';

const getTechDetails = (techName) => {
  const map = {
    'Python': { icon: <Code />, color: 'blue' },
    'OpenCV': { icon: <Monitor />, color: 'indigo' },
    'React': { icon: <Layers />, color: 'purple' },
    'Node.js': { icon: <Box />, color: 'green' },
    'MongoDB': { icon: <Database />, color: 'green' },
    'Express': { icon: <Settings />, color: 'orange' },
    'Stripe': { icon: <Cloud />, color: 'purple' },
    'Scikit-learn': { icon: <Cpu />, color: 'orange' },
    'TensorFlow': { icon: <Box />, color: 'red' },
    'Flask': { icon: <Monitor />, color: 'gray' },
    'PyTorch': { icon: <Cpu />, color: 'red' },
    'Django REST': { icon: <Code />, color: 'green' },
  };
  return map[techName] || { icon: <Hash />, color: 'blue' };
};

const projects = [
  {
    title: 'Smart-Parking',
    description: 'An intelligent parking management system that uses computer vision to detect available spots in real-time, guide drivers efficiently, and reduce urban congestion.',
    tech: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
    accent: '#7c3aed',
    image: assets.proj1,
    num: '01',
  },
  {
    title: 'Lush',
    description: 'A full-stack e-commerce platform for organic and eco-friendly products, featuring a seamless shopping experience, cart management, and secure payment integration.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    accent: '#059669',
    image: assets.proj2,
    num: '02',
  },
  {
    title: 'Air & Water Monitoring Models',
    description: 'ML-powered environmental monitoring system that collects sensor data, predicts pollution levels, and provides real-time alerts for air and water quality anomalies.',
    tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Flask', 'React'],
    accent: '#2563eb',
    image: assets.proj3,
    num: '03',
  },
  {
    title: 'Deepfake Detection',
    description: 'A deep learning system that detects AI-generated deepfake videos using frame-level analysis. Features a Django REST backend with a React frontend for real-time results.',
    tech: ['Python', 'PyTorch', 'Django REST', 'React', 'OpenCV'],
    accent: '#e11d48',
    image: assets.proj4,
    num: '04',
  },
];

const CARD_W = 420;
const CARD_H = 300;
const CARD_DISTANCE = 60;
const VERTICAL_DISTANCE = 70;
const SKEW = 6;
const DELAY = 4000;

const makeSlot = (i, total) => ({
  x: i * CARD_DISTANCE,
  y: -i * VERTICAL_DISTANCE,
  z: -i * CARD_DISTANCE * 1.5,
  zIndex: total - i,
});

const Projects = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const orderRef = useRef(projects.map((_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);

  const total = projects.length;

  // Track which project is currently in front for the left panel
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Initial placement
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const slot = makeSlot(i, total);
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: SKEW,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true,
      });
    });

    const swap = () => {
      if (isPausedRef.current) return;
      if (orderRef.current.length < 2) return;
      const [front, ...rest] = orderRef.current;
      const elFront = cardRefs.current[front];
      const tl = gsap.timeline({
        onComplete: () => {
          // After swap, update active index to the new front card
          setActiveIndex(orderRef.current[0]);
        },
      });
      tlRef.current = tl;

      // Front card drops down
      tl.to(elFront, { y: '+=500', duration: 2, ease: 'elastic.out(0.6,0.9)' });

      // Remaining cards promote
      tl.addLabel('promote', `-=${2 * 0.9}`);
      rest.forEach((idx, i) => {
        const el = cardRefs.current[idx];
        const slot = makeSlot(i, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: 2, ease: 'elastic.out(0.6,0.9)' }, `promote+=${i * 0.15}`);
      });

      // Front card returns to back
      const backSlot = makeSlot(total - 1, total);
      tl.addLabel('return', `promote+=${2 * 0.05}`);
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 2, ease: 'elastic.out(0.6,0.9)' }, 'return');
      tl.call(() => { orderRef.current = [...rest, front]; });
    };

    swap();
    intervalRef.current = setInterval(swap, DELAY);

    return () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40">
      {/* Header */}
      <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Projects</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-16">Things I've Built</h2>

      {/* Layout: details left, cards right */}
      <div className="flex flex-col lg:flex-row items-start gap-12" style={{ minHeight: '560px' }}>

        {/* Left: active project details — Certificates-style transition */}
        <div className="relative w-full lg:w-1/2 pt-4" style={{ minHeight: '400px' }}>
          {projects.map((p, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full flex flex-col transition-all duration-700
                ${activeIndex === index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
              {/* num / label */}
              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-6 uppercase">
                <span>{p.num} / PROJECTS</span>
                <div className="flex-grow h-[1px] bg-gray-300 dark:bg-gray-700" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif italic mb-5 leading-tight text-gray-900 dark:text-gray-100">
                {p.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-sm">
                {p.description}
              </p>

              <div className="flex flex-col gap-2 text-xs tracking-[0.15em] mb-4">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-gray-400 uppercase w-20">Stack</span>
                  <div className="w-full text-[10px] mt-2 pb-6">
                    <GlassIcons
                      items={p.tech.map((t) => {
                        const iconData = getTechDetails(t);
                        return { icon: iconData.icon, color: iconData.color, label: t };
                      })}
                      className="!py-0 !mx-0 !gap-[3.5em] !grid-cols-4 sm:!grid-cols-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                <span className="whitespace-nowrap">HOVER CARD TO PAUSE</span>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Right: GSAP card stack */}
        <div
          ref={containerRef}
          className="relative w-full lg:w-1/2"
          style={{
            height: '540px',
            perspective: '900px',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute bottom-0 right-0 overflow-visible"
            style={{
              width: CARD_W,
              height: CARD_H,
              transform: 'translateX(5%) translateY(-50%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute top-1/2 left-1/2 rounded-xl border border-gray-800 overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Full-size image */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />

                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: p.accent }}
                />

                {/* Title overlay at top */}
                <div className="absolute top-0 left-0 right-0 px-5 pt-5 pb-8"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)'
                  }}
                >
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: p.accent }}>
                    {p.num} / Projects
                  </p>
                  <h3 className="text-sm font-bold text-white leading-snug">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
