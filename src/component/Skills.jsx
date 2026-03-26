import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '../components/Magnet';
import StarBorder from '../components/StarBorder';

gsap.registerPlugin(ScrollTrigger);

const B = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skills = [
    // inner ring (7)
    { name: 'JavaScript', icon: `${B}/javascript/javascript-original.svg` },
    { name: 'Python', icon: `${B}/python/python-original.svg` },
    { name: 'HTML5', icon: `${B}/html5/html5-original.svg` },
    { name: 'CSS3', icon: `${B}/css3/css3-original.svg` },
    { name: 'C', icon: `${B}/c/c-original.svg` },
    { name: 'C++', icon: `${B}/cplusplus/cplusplus-original.svg` },
    { name: 'MySQL', icon: `${B}/mysql/mysql-original.svg` },
    // middle ring (6)
    { name: 'Django', icon: `${B}/django/django-plain.svg` },
    { name: 'Django REST', icon: `${B}/djangorest/djangorest-original.svg` },
    { name: 'GitHub', icon: `${B}/github/github-original.svg` },
    { name: 'MongoDB', icon: `${B}/mongodb/mongodb-original.svg` },
    { name: 'Canva', icon: `${B}/canva/canva-original.svg` },
    { name: 'PyTorch', icon: `${B}/pytorch/pytorch-original.svg` },
    // outer ring (6)
    { name: 'scikit-learn', icon: `${B}/scikitlearn/scikitlearn-original.svg` },
    { name: 'NumPy', icon: `${B}/numpy/numpy-original.svg` },
    { name: 'Pandas', icon: `${B}/pandas/pandas-original.svg` },
    { name: 'Matplotlib', icon: `${B}/matplotlib/matplotlib-original.svg` },
    { name: 'Plotly', icon: `${B}/plotly/plotly-original.svg` },
    { name: 'TensorFlow', icon: `${B}/tensorflow/tensorflow-original.svg` },
];

// Static config: which ring + base angle for each skill
// Positions are computed dynamically each frame by adding the live rotation angle
const skillConfig = [
    // inner ring (r=115, 7 items, step≈51.43°, start=-90°)
    { ring: 1, r: 115, base: -90 },
    { ring: 1, r: 115, base: -38.57 },
    { ring: 1, r: 115, base: 12.86 },
    { ring: 1, r: 115, base: 64.29 },
    { ring: 1, r: 115, base: 115.71 },
    { ring: 1, r: 115, base: 167.14 },
    { ring: 1, r: 115, base: 218.57 },
    // middle ring (r=215, 6 items, step=60°, start=-60°)
    { ring: 2, r: 215, base: -60 },
    { ring: 2, r: 215, base: 0 },
    { ring: 2, r: 215, base: 60 },
    { ring: 2, r: 215, base: 120 },
    { ring: 2, r: 215, base: 180 },
    { ring: 2, r: 215, base: 240 },
    // outer ring (r=310, 6 items, step=60°, start=-90°)
    { ring: 3, r: 310, base: -90 },
    { ring: 3, r: 310, base: -30 },
    { ring: 3, r: 310, base: 30 },
    { ring: 3, r: 310, base: 90 },
    { ring: 3, r: 310, base: 150 },
    { ring: 3, r: 310, base: 210 },
];

// Pixel card/icon size per ring
const cardSz = { 1: 68, 2: 62, 3: 56 };
const iconSz = { 1: 34, 2: 30, 3: 26 };

const SVG_SIZE = 700;
const cx = 350, cy = 350;
const radii = [115, 215, 310];
const radialAngles = [0, 60, 120, 180, 240, 300];
const toRad = (deg) => (deg * Math.PI) / 180;

const Skills = ({ theme }) => {
    const isDark = theme === 'dark';
    const lineColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(120,120,120,0.15)';
    const dotColor = isDark ? 'rgba(255,255,255,0.20)' : 'rgba(120,120,120,0.30)';

    const titleRef = useRef(null);

    useEffect(() => {
        if (!titleRef.current) return;
        const charElements = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(charElements,
            {
                willChange: 'opacity, transform',
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: '50% 0%'
            },
            {
                duration: 1,
                ease: 'back.inOut(2)',
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: 0.03,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'center bottom+=50%',
                    end: 'bottom bottom-=40%',
                    scrub: true
                }
            }
        );
    }, []);

    const titleText = "Technologies I Work With".split('').map((char, index) => (
        <span className="inline-block word" key={index}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    // requestAnimationFrame-driven rotation — no CSS keyframes needed
    const [angle, setAngle] = useState(0);
    const rafRef = useRef(null);
    const lastRef = useRef(null);

    useEffect(() => {
        const SPEED = 18; // degrees per second
        const tick = (ts) => {
            if (lastRef.current !== null) {
                const dt = (ts - lastRef.current) / 1000;
                setAngle(prev => (prev + SPEED * dt) % 360);
            }
            lastRef.current = ts;
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <section id="skills" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40">

            {/* Header */}
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
                Skills
            </p>
            <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-16 overflow-hidden">
                {titleText}
            </h2>

            {/* Orbital container */}
            <div className="relative mx-auto w-full max-w-[680px] aspect-square">

                {/* SVG decorative circles + radial lines — also rotated */}
                <svg
                    viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50% 50%' }}
                    aria-hidden="true"
                >
                    {radialAngles.map((deg) => (
                        <line
                            key={deg}
                            x1={cx + radii[2] * Math.cos(toRad(deg - 90))}
                            y1={cy + radii[2] * Math.sin(toRad(deg - 90))}
                            x2={cx - radii[2] * Math.cos(toRad(deg - 90))}
                            y2={cy - radii[2] * Math.sin(toRad(deg - 90))}
                            stroke={lineColor}
                            strokeWidth="1.5"
                        />
                    ))}
                    {radii.map((r) => (
                        <circle key={r} cx={cx} cy={cy} r={r}
                            fill="none" stroke={lineColor} strokeWidth="1.5" />
                    ))}
                    <circle cx={cx} cy={cy} r="4" fill={dotColor} />
                </svg>

                {/* Skill cards — positions computed from live angle so they orbit */}
                {skills.map((skill, i) => {
                    const cfg = skillConfig[i];
                    const rad = toRad(angle + cfg.base);
                    // Position as % of 700px container
                    const left = (50 + (cfg.r / 700) * Math.cos(rad) * 100).toFixed(4) + '%';
                    const top = (50 + (cfg.r / 700) * Math.sin(rad) * 100).toFixed(4) + '%';
                    const sz = (cardSz[cfg.ring] / 700 * 100).toFixed(4) + '%';
                    const isz = (iconSz[cfg.ring] / cardSz[cfg.ring] * 100).toFixed(4) + '%';

                    return (
                        <div
                            key={skill.name}
                            className="absolute group flex flex-col items-center justify-center gap-1.5
                                       rounded-2xl
                                       bg-gray-100 dark:bg-white/5
                                       border border-gray-200 dark:border-white/10
                                       hover:border-primary/60
                                       hover:bg-gray-200 dark:hover:bg-white/10
                                       hover:shadow-lg hover:shadow-primary/20
                                       transition-[border,box-shadow,background] duration-300
                                       cursor-default backdrop-blur-sm"
                            style={{
                                left,
                                top,
                                width: sz,
                                height: sz,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                style={{ width: isz, height: isz }}
                                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                onError={(e) => { e.target.style.opacity = '0.3'; }}
                            />
                                <span className="absolute -bottom-3 sm:-bottom-5 text-[5px] sm:text-[8px] font-medium text-center leading-tight px-1
                                                  text-gray-400 dark:text-white/40
                                                  group-hover:text-gray-700 dark:group-hover:text-white/80
                                                  transition-colors duration-300">
                                    {skill.name}
                                </span>
                        </div>
                    );
                })}

                {/* Star dots */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gray-400/20 dark:bg-white/20"
                        style={{
                            width: Math.random() * 2 + 1,
                            height: Math.random() * 2 + 1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.4 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-2 mt-10 max-w-[680px] mx-auto">
                {skills.map((skill) => (
                    <span
                        key={skill.name}
                        className="text-xs cursor-default
                                   text-gray-400 dark:text-white/30
                                   hover:text-gray-700 dark:hover:text-white/70
                                   transition-colors duration-200"
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Skills;
