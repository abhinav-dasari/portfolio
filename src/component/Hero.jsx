import React from 'react';
import assets from '../assets/assets';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 pb-16 dark:bg-black bg-white">

            {/* Status Badge */}
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-normal tracking-wide">
                    Open to opportunities
                </span>
            </div>

            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 dark:text-white mb-2 tracking-tight">
                    Hi, I'm Abhinav
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Machine Learning Engineer
                </h2>
            </div>

            {/* Profile Photo */}
            <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 to-purple-500/30 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative w-56 h-64 sm:w-64 sm:h-80 lg:w-72 lg:h-96 rounded-3xl overflow-hidden border border-gray-200/20 dark:border-white/10 shadow-2xl">
                    <img
                        src={assets.profile}
                        alt="Abhinav Dasari"
                        className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>

            {/* Subtle scroll hint */}
            <div className="mt-16 flex flex-col items-center gap-2 opacity-40 dark:opacity-30 animate-bounce">
                <div className="w-px h-10 bg-gray-400 dark:bg-gray-600"></div>
                <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">Scroll</span>
            </div>

        </section>
    );
};

export default Hero;
