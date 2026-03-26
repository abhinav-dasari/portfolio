import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import assets from '../assets/assets';
import GlassIcons from '../components/GlassIcons';
import BorderGlow from '../components/BorderGlow';
import SplitTextTitle from '../components/SplitTextTitle';
import ScrollRevealDescription from '../components/ScrollRevealDescription';
import ProjectModal from '../components/ProjectModal';
import { Code, Database, Monitor, Cpu, Box, Cloud, Settings, Layers, Hash } from 'lucide-react';

const B = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const getTechDetails = (techName) => {
  const map = {
    'Python': { icon: <img src={`${B}/python/python-original.svg`} alt="Python" className="w-full h-full object-contain drop-shadow-md" />, color: 'blue' },
    'OpenCV': { icon: <img src={`${B}/opencv/opencv-original.svg`} alt="OpenCV" className="w-full h-full object-contain drop-shadow-md" />, color: 'indigo' },
    'React': { icon: <img src={`${B}/react/react-original.svg`} alt="React" className="w-full h-full object-contain drop-shadow-md" />, color: 'purple' },
    'Node.js': { icon: <img src={`${B}/nodejs/nodejs-original.svg`} alt="Node.js" className="w-full h-full object-contain drop-shadow-md" />, color: 'green' },
    'MongoDB': { icon: <img src={`${B}/mongodb/mongodb-original.svg`} alt="MongoDB" className="w-full h-full object-contain drop-shadow-md" />, color: 'green' },
    'Express': { icon: <img src={`${B}/express/express-original.svg`} alt="Express" className="w-full h-full object-contain bg-white/90 rounded-full p-0.5" />, color: 'orange' },
    'Stripe': { icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="w-full h-full object-contain bg-white/90 rounded p-1" />, color: 'purple' },
    'Scikit-learn': { icon: <img src={`${B}/scikitlearn/scikitlearn-original.svg`} alt="Scikit-learn" className="w-full h-full object-contain drop-shadow-md" />, color: 'orange' },
    'TensorFlow': { icon: <img src={`${B}/tensorflow/tensorflow-original.svg`} alt="TensorFlow" className="w-full h-full object-contain drop-shadow-md" />, color: 'red' },
    'Flask': { icon: <img src={`${B}/flask/flask-original.svg`} alt="Flask" className="w-full h-full object-contain bg-white/90 rounded-full p-0.5" />, color: 'gray' },
    'PyTorch': { icon: <img src={`${B}/pytorch/pytorch-original.svg`} alt="PyTorch" className="w-full h-full object-contain drop-shadow-md" />, color: 'red' },
    'Django REST': { icon: <img src={`${B}/djangorest/djangorest-original.svg`} alt="Django REST" className="w-full h-full object-contain drop-shadow-md" />, color: 'green' },
  };
  return map[techName] || { icon: <Hash className="w-full h-full" />, color: 'blue' };
};

const projects = [
  {
    title: 'Smart-Parking',
    description: 'An intelligent parking management system that uses computer vision to detect available spots in real-time, guide drivers efficiently, and reduce urban congestion.',
    tech: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
    accent: '#7c3aed',
    image: assets.proj1,
    num: '01',
    status: 'ACTIVE',
    overview: 'An all-in-one Smart Parking platform that modernizes parking spot detection, driver guidance, and payment using AI and IoT. Designed to reduce traffic congestion and improve urban mobility.',
    problem: 'Urban areas suffer from severe traffic congestion largely caused by drivers circulating to find parking. This leads to increased carbon emissions, wasted time, and driver frustration.',
    solution: 'Deployed a network of cameras running real-time YOLO object detection to monitor parking spot availability. This data is fed into a fast centralized backend which updates a live mobile app for drivers.',
    github: 'https://github.com/abhinav-dasari/Smart-Parking',
    live: 'https://example.com'
  },
  {
    title: 'Lush',
    description: 'A full-stack e-commerce platform for organic and eco-friendly products, featuring a seamless shopping experience, cart management, and secure payment integration.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    accent: '#059669',
    image: assets.proj2,
    num: '02',
    status: 'COMPLETED',
    overview: 'A premium full-stack e-commerce platform dedicated exclusively to organic and eco-friendly products. It features real-time inventory, secure Stripe checkout, and an intuitive admin dashboard.',
    problem: 'Consumers looking for eco-friendly products often have to navigate fragmented marketplaces with poor user experiences, questionable product sourcing, and clunky payment gateways.',
    solution: 'Built a unified, high-performance React frontend connected to a scalable Node.js/Express backend. Integrated MongoDB for robust product management and Stripe for frictionless, secure payments.',
    github: 'https://github.com/abhinav-dasari/Lush',
    live: 'https://example.com'
  },
  {
    title: 'Air & Water Monitoring Models',
    description: 'ML-powered environmental monitoring system that collects sensor data, predicts pollution levels, and provides real-time alerts for air and water quality anomalies.',
    tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Flask', 'React'],
    accent: '#2563eb',
    image: assets.proj3,
    num: '03',
    status: 'IN PROGRESS',
    overview: 'A machine-learning-driven environmental dashboard that analyzes live sensor data to predict and alert communities about dangerous spikes in air and water pollution.',
    problem: 'Local governments and citizens lack accessible, predictive insights into imminent environmental hazards, often receiving warnings only after pollution levels have already become dangerous.',
    solution: 'Developed predictive models using Scikit-learn and TensorFlow that consume historical and live IoT sensor data. A Flask API serves these predictions to a dynamic React dashboard for real-time public monitoring.',
    github: 'https://github.com/abhinav-dasari/Air_and_Water_Monitoring_Models',
    live: 'https://example.com'
  },
  {
    title: 'Deepfake Detection',
    description: 'A deep learning system that detects AI-generated deepfake videos using frame-level analysis. Features a Django REST backend with a React frontend for real-time results.',
    tech: ['Python', 'PyTorch', 'Django REST', 'React', 'OpenCV'],
    accent: '#e11d48',
    image: assets.proj4,
    num: '04',
    status: 'ACTIVE',
    overview: 'An advanced deep learning pipeline designed to combat misinformation by accurately detecting AI-generated manipulations and deepfakes in video content through forensic frame-level analysis.',
    problem: 'The rapid advancement of generative AI has led to a surge in highly realistic deepfakes, posing significant threats to personal identity, media integrity, and political stability.',
    solution: 'Implemented a sophisticated neural network using PyTorch and OpenCV to analyze subtle spatiotemporal artifacts. Deployed the model via a scalable Django REST backend, accessible through a React web interface.',
    github: 'https://github.com/abhinav-dasari/Deepfake-Detection',
    live: 'https://example.com'
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
  
  // Track selected project for modal
  const [selectedProject, setSelectedProject] = useState(null);

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
      <SplitTextTitle 
          text="Things I've Built"
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-16"
      />

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

              {activeIndex === index && (
                  <ScrollRevealDescription 
                      text={p.description} 
                      className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-sm" 
                      disableScroll={true} 
                  />
              )}
              {activeIndex !== index && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-sm opacity-0">
                      {p.description}
                  </p>
              )}

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
                className="absolute top-1/2 left-1/2 rounded-xl border border-gray-800 overflow-visible cursor-pointer group"
                onClick={() => setSelectedProject(p)}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                <BorderGlow 
                  className="w-full h-full rounded-xl"
                  backgroundColor="transparent"
                  glowColor="40 80 80"
                  borderRadius={12}
                  animated={false}
                >
                  <div className="relative z-10 w-full h-full overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
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
                </BorderGlow>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
