import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!certificate) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/80 dark:bg-[#09090b]/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full md:w-[90vw] max-w-5xl h-auto max-h-[90vh] flex flex-col bg-gray-50 dark:bg-[#0f0f13] border border-gray-300 dark:border-gray-800/80 rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 dark:from-orange-600 via-orange-400 dark:via-orange-500 to-transparent opacity-80" />

                        {/* Top Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#111116]">
                            
                            {/* Left: Title & Subtitle */}
                            <div className="flex items-center gap-4">
                                {/* Dot indicator */}
                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                                
                                <div className="flex flex-col">
                                    <h2 className="text-gray-900 dark:text-white font-semibold text-lg sm:text-xl tracking-wide uppercase font-mono">
                                        {certificate.title}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
                                        {certificate.artist} • {certificate.year}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <a 
                                    href={certificate.verifyUrl || '#'} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/50 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 text-xs font-semibold tracking-widest uppercase hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:border-orange-600 dark:hover:border-orange-500/50 transition-colors"
                                >
                                    Verify Official
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                
                                <a 
                                    href={certificate.image} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Open File
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-800 mx-1" />

                                <button 
                                    onClick={onClose}
                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-full transition-colors group"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area (Image Viewer) */}
                        <div className="flex-1 relative bg-gray-100 dark:bg-[#0a0a0c] flex items-center justify-center p-3 sm:p-6 overflow-hidden group">
                            
                            {/* Subtle background glow behind the image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

                            {/* Certificate Image Container */}
                            <div className="relative max-w-full max-h-full flex items-center justify-center bg-white dark:bg-transparent shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-300/60 dark:border-gray-800/40 rounded-lg overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                                <img 
                                    src={certificate.image} 
                                    alt={certificate.title}
                                    className="max-w-full h-auto object-contain"
                                    style={{
                                        maxHeight: 'calc(90vh - 140px)',
                                    }}
                                />
                            </div>

                            {/* Floating Action Button (like the target icon in screenshot) */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                                <button 
                                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700/50 bg-white/80 dark:bg-[#111116]/80 backdrop-blur flex items-center justify-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                                    title="View Full Screen"
                                    onClick={() => window.open(certificate.image, '_blank')}
                                >
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_currentColor]" />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Footer Bar */}
                        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#0f0f13]">
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                DOCUMENT LOADED
                            </div>
                            <div className="text-xs text-gray-500 hidden sm:block">
                                Press <kbd className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-sans mx-1">ESC</kbd> to close
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default CertificateModal;
