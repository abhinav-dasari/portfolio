import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion, useMotionValue, useTransform, useInView, animate } from 'motion/react';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
    const textRef = useRef(null);
    const cursorRef = useRef(null);
    const titleRef = useRef(null);

    // Decrypt Effect using motion
    const titleVal = useMotionValue(0);
    const rawTitle = "Hi, I'm Abhinav";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
    
    const displayTitle = useTransform(titleVal, (latest) => {
        let result = "";
        for (let i = 0; i < rawTitle.length; i++) {
            if (rawTitle[i] === " " || rawTitle[i] === "," || rawTitle[i] === "'") {
                result += rawTitle[i];
            } else if (i < latest) {
                result += rawTitle[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return result;
    });

    const isTitleInView = useInView(titleRef, { once: true, margin: "-10%" });

    const triggerDecrypt = () => {
        titleVal.set(0);
        animate(titleVal, rawTitle.length, {
            duration: 1.5,
            ease: "linear",
        });
    };

    useEffect(() => {
        if (isTitleInView) {
            triggerDecrypt();
        }
    }, [isTitleInView, titleVal]);

    useEffect(() => {
        // Blinking cursor
        gsap.to(cursorRef.current, {
            opacity: 0,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            duration: 0.5
        });

        const words = ["Machine Learning Engineer", "Data Scientist", "AI Enthusiast", "Software Developer"];
        const masterTl = gsap.timeline({ repeat: -1 });

        words.forEach(word => {
            const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 2 });
            tl.to(textRef.current, { duration: Math.max(1.5, word.length * 0.08), text: word, ease: "none" });
            masterTl.add(tl);
        });

        return () => {
            masterTl.kill();
        };
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-12 lg:px-24 xl:px-40 pt-24 pb-20 gap-12 lg:gap-0">

            {/* Left side: Text Content */}
            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[55%] lg:pr-8">
                {/* Status Badge */}
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-1.5 mb-6 lg:mb-8 animate-fade-in w-max">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-normal tracking-wide">
                        Open to opportunities
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-6 lg:mb-10 min-h-[90px] xl:min-h-[100px]">
                    <motion.h1 
                        ref={titleRef}
                        onMouseEnter={triggerDecrypt}
                        className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-2 tracking-tight block w-max cursor-default"
                    >
                        {displayTitle}
                    </motion.h1>
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                        <span ref={textRef} className="inline whitespace-pre-wrap"></span>
                        <span ref={cursorRef} className="inline-block opacity-100 font-light ml-1">|</span>
                    </h2>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-8 animate-fade-in">
                    <a href="#projects" className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:border-cyan-500 hover:dark:border-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        VIEW PROJECTS
                    </a>
                    <a href="#contact" className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:dark:border-purple-400 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        CONTACT ME
                    </a>
                    <Link to="/resume" className="px-6 py-3 rounded-full border border-cyan-500 dark:border-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 font-bold tracking-wide transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                        RESUME
                    </Link>
                </div>
            </div>

            {/* Right side: Profile Photo */}
            <div className="relative z-10 group w-full lg:w-[45%] flex justify-center lg:justify-end">
                <div className="relative w-48 h-56 sm:w-56 sm:h-72 lg:w-[260px] lg:h-[320px] xl:w-[280px] xl:h-[360px]">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 to-purple-500/30 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-200/20 dark:border-white/10 shadow-2xl">
                        <img
                            src={assets.profile}
                            alt="Abhinav Dasari"
                            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Centered Scroll Hint with Mouse */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 opacity-60 dark:opacity-50 hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 sm:h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase">SCROLL</span>
                </div>
            </div>

        </section>
    );
};

export default Hero;
