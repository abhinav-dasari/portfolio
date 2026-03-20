import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const interests = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Robotic Process Automation',
    'Intelligent Automation',
];

const AboutMe = () => {
    const textRef = useRef(null);
    const bioContainerRef = useRef(null);

    const paragraphs = [
        "Hi, I'm Abhinav Dasari, a B.Tech student majoring in Computer Science and Engineering (Artificial Intelligence & Machine Learning) with a minor in Robotic Process Automation (RPA). I am passionate about technology and enjoy learning how intelligent systems and automation can solve real-world problems.",
        "My academic focus is on AI, Machine Learning, and Automation, and I continuously work on improving my skills in programming, problem-solving, and software development. I enjoy building projects that combine modern technologies, intelligent algorithms, and practical applications.",
        "I am particularly interested in exploring areas such as Artificial Intelligence, Deep Learning, Computer Vision, and intelligent automation systems. I believe in continuous learning and actively work on developing projects that strengthen my technical knowledge and creativity.",
        "My goal is to grow as an AI/ML engineer and automation specialist, contributing to innovative solutions that make technology more efficient and impactful."
    ];

    const renderedParagraphs = useMemo(() => {
        return paragraphs.map((text, pIndex) => (
            <p key={pIndex} className="my-2 leading-[1.7]">
                {text.split(/(\s+)/).map((word, wIndex) => {
                    if (word.match(/^\s+$/)) return word;
                    return <span key={wIndex} className="inline-block bio-word opacity-10">{word}</span>;
                })}
            </p>
        ));
    }, []);

    useEffect(() => {
        if (!bioContainerRef.current) return;

        gsap.fromTo(bioContainerRef.current,
            { transformOrigin: '0% 50%', rotate: 1 },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: bioContainerRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );

        const wordElements = bioContainerRef.current.querySelectorAll('.bio-word');
        gsap.fromTo(wordElements,
            { opacity: 0.1, filter: "blur(3px)" },
            {
                ease: 'none',
                opacity: 1,
                filter: "blur(0px)",
                stagger: 0.05,
                scrollTrigger: {
                    trigger: bioContainerRef.current,
                    start: 'top bottom-=20%',
                    end: 'bottom bottom',
                    scrub: true
                }
            }
        );
    }, []);

    useEffect(() => {
        if (!textRef.current) return;
        const charElements = textRef.current.querySelectorAll('.word');
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
                    trigger: textRef.current,
                    start: 'center bottom+=50%',
                    end: 'bottom bottom-=40%',
                    scrub: true
                }
            }
        );
    }, []);

    const titleText = "Who I Am".split('').map((char, index) => (
        <span className="inline-block word" key={index}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <section
            id="about"
            className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40"
        >
            {/* Section Label */}
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
                About Me
            </p>

            {/* Section Title */}
            <h2 ref={textRef} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 overflow-hidden">
                {titleText}
            </h2>

            <div className="grid lg:grid-cols-5 gap-12 items-start">

                {/* Bio Text */}
                <div ref={bioContainerRef} className="lg:col-span-3 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                    {renderedParagraphs}
                </div>

                {/* Interests Card */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-6">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
                            Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="text-xs font-medium px-3 py-1.5 rounded-full
                                               bg-white dark:bg-gray-800
                                               border border-gray-200 dark:border-gray-700
                                               text-gray-700 dark:text-gray-300
                                               hover:border-primary hover:text-primary
                                               transition-colors duration-200 cursor-default"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-5 border-t border-gray-100 dark:border-gray-800" />

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">B.Tech</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">CSE — AI &amp; ML</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">RPA</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Minor</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
