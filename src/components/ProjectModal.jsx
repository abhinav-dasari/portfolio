import React, { useEffect, useState, useRef } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Magnet from '../components/Magnet';
import StarBorder from '../components/StarBorder';
import SplitText from '../components/SplitText';

const B = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const getTechDetails = (techName) => {
    const map = {
        'Python': { icon: <img src={`${B}/python/python-original.svg`} alt="Python" className="w-full h-full object-contain" /> },
        'OpenCV': { icon: <img src={`${B}/opencv/opencv-original.svg`} alt="OpenCV" className="w-full h-full object-contain" /> },
        'React': { icon: <img src={`${B}/react/react-original.svg`} alt="React" className="w-full h-full object-contain" /> },
        'Node.js': { icon: <img src={`${B}/nodejs/nodejs-original.svg`} alt="Node.js" className="w-full h-full object-contain" /> },
        'MongoDB': { icon: <img src={`${B}/mongodb/mongodb-original.svg`} alt="MongoDB" className="w-full h-full object-contain" /> },
        'Express': { icon: <img src={`${B}/express/express-original.svg`} alt="Express" className="w-full h-full object-contain bg-white/90 rounded-full" /> },
        'Stripe': { icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="w-full h-full object-contain bg-white/90 rounded p-0.5" /> },
        'Scikit-learn': { icon: <img src={`${B}/scikitlearn/scikitlearn-original.svg`} alt="Scikit" className="w-full h-full object-contain" /> },
        'TensorFlow': { icon: <img src={`${B}/tensorflow/tensorflow-original.svg`} alt="TensorFlow" className="w-full h-full object-contain" /> },
        'Flask': { icon: <img src={`${B}/flask/flask-original.svg`} alt="Flask" className="w-full h-full object-contain bg-white/90 rounded-full" /> },
        'PyTorch': { icon: <img src={`${B}/pytorch/pytorch-original.svg`} alt="PyTorch" className="w-full h-full object-contain" /> },
        'Django REST': { icon: <img src={`${B}/djangorest/djangorest-original.svg`} alt="Django REST" className="w-full h-full object-contain" /> },
    };
    return map[techName] || { icon: null };
};

const springConfig = { damping: 30, stiffness: 100, mass: 2 };

const ProjectModal = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const modalRef = useRef(null);

    // Tilt motion values
    const rotateX = useSpring(useMotionValue(0), springConfig);
    const rotateY = useSpring(useMotionValue(0), springConfig);

    function handleMouseMove(e) {
        const el = modalRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        rotateX.set((offsetY / (rect.height / 2)) * -6);
        rotateY.set((offsetX / (rect.width / 2)) * 6);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent scrolling on body and html when modal is open
    useEffect(() => {
        const originalBodyScroll = document.body.style.overflow;
        const originalHtmlScroll = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalBodyScroll;
            document.documentElement.style.overflow = originalHtmlScroll;
        };
    }, []);

    if (!project) return null;

    const tabs = [
        { id: 'OVERVIEW', label: 'OVERVIEW', content: project.overview || project.description },
        { id: 'PROBLEM', label: 'PROBLEM', content: project.problem || 'Problem definition not provided.' },
        { id: 'SOLUTION', label: 'SOLUTION', content: project.solution || 'Solution details not provided.' },
    ];

    const activeContent = tabs.find(t => t.id === activeTab)?.content;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ perspective: '1200px' }}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container — tilts on mouse move */}
            <motion.div
                ref={modalRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-4xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 [transform-style:preserve-3d]"
                style={{ rotateX, rotateY }}
                role="dialog"
                aria-modal="true"
            >
                {/* Status Ribbon Effect (Top Right) */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 pointer-events-none">
                    <div className="absolute top-0 right-0 bg-green-500/90 text-white text-[10px] font-bold tracking-widest px-10 py-1.5 shadow-lg transform rotate-45 translate-x-[30%] translate-y-[40%] text-center uppercase border-y border-green-400/50 backdrop-blur-sm">
                        {project.status || 'ACTIVE'}
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-30 bg-white/10 dark:bg-black/20 p-1.5 rounded-full backdrop-blur-sm"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800/50 relative z-10">
                    <div className="flex items-center gap-3 text-xs tracking-[0.2em] font-bold uppercase mb-4">
                        <span className="text-purple-600 dark:text-purple-500">Project {project.num || '#01'}</span>
                    </div>

                    <div style={{ fontFamily: 'monospace' }}>
                        <SplitText
                            text={project.title}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                            delay={30}
                            duration={0.8}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="left"
                            tag="h2"
                        />
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="px-6 md:px-8 pt-6">
                    <div className="flex flex-wrap gap-3">
                        {project.tech?.map((tech, idx) => {
                            const details = getTechDetails(tech);
                            return (
                                <Magnet key={idx} padding={20} disabled={false} magnetStrength={3}>
                                    <StarBorder
                                        as="div"
                                        className="!rounded-lg"
                                        color="#a855f7"
                                        speed="3s"
                                        thickness={1.5}
                                        innerClassName="px-4 py-1.5 rounded-lg border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400 text-xs font-bold tracking-widest uppercase bg-purple-50 dark:bg-purple-500/[0.05] relative z-10 block group/tech cursor-default"
                                    >
                                        <span className="flex items-center gap-0 group-hover/tech:gap-2 transition-all duration-300 overflow-hidden">
                                            {/* Logo — slides in from left on hover */}
                                            <span className="w-0 h-4 overflow-hidden group-hover/tech:w-4 transition-all duration-300 flex-shrink-0 flex items-center justify-center">
                                                {details.icon}
                                            </span>
                                            {tech}
                                        </span>
                                    </StarBorder>
                                </Magnet>
                            );
                        })}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 overflow-y-auto">

                    {/* Tabs */}
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800/50 pb-px">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-t-lg border-b-2 transition-all duration-200 ${isActive
                                        ? 'text-cyan-600 dark:text-cyan-400 border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-400/5'
                                        : 'text-gray-500 dark:text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Panel */}
                    <div className="bg-gray-50 dark:bg-[#0c1015] border border-gray-200 dark:border-cyan-900/40 rounded-xl p-6 md:p-8 relative overflow-hidden group">
                        {/* Subtle background glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                        <div className="flex items-center gap-3 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                            {activeTab}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base relative z-10">
                            {activeContent}
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-800/50 flex flex-wrap items-center justify-between gap-6 bg-gray-50/50 dark:bg-[#050505]">
                    <div className="flex items-center gap-4">
                        <Magnet padding={30} disabled={false} magnetStrength={3}>
                            <StarBorder
                                as="a"
                                href={project.github || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="!rounded-lg block"
                                color="#6b7280"
                                speed="3s"
                                thickness={1.5}
                                innerClassName="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-xs font-bold tracking-widest text-center hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all uppercase relative z-10 h-full w-full"
                            >
                                <Github className="w-4 h-4" />
                                SOURCE CODE
                            </StarBorder>
                        </Magnet>

                        <Magnet padding={30} disabled={false} magnetStrength={3}>
                            <StarBorder
                                as="a"
                                href={project.live || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="!rounded-lg block"
                                color="#a855f7"
                                speed="3s"
                                thickness={1.5}
                                innerClassName="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-purple-200 dark:border-purple-500/50 text-purple-700 dark:text-purple-400 text-xs font-bold tracking-widest text-center hover:bg-purple-50 dark:hover:bg-purple-500/20 hover:text-purple-800 dark:hover:text-purple-300 transition-all uppercase relative z-10 h-full w-full"
                            >
                                LIVE DEMO
                                <ExternalLink className="w-4 h-4" />
                            </StarBorder>
                        </Magnet>
                    </div>

                    <div className="text-gray-500 dark:text-gray-600 text-xs tracking-wider flex items-center gap-2 hidden sm:flex">
                        Press
                        <kbd className="px-2 py-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-sans text-[10px] text-gray-700 dark:text-gray-400">ESC</kbd>
                        to close
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ProjectModal;
