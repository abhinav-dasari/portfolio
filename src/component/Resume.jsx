import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050505] text-white overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 bg-transparent">
        
        {/* Left: BACK TO BASE */}
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#00e5ff] hover:text-[#00ffff] hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all duration-300 uppercase leading-none"
        >
          <span className="text-lg -mt-1 group-hover:-translate-x-1 transition-transform tracking-normal font-sans">&larr;</span> 
          BACK TO BASE
        </button>
        
        {/* Center: Glitch Title RESUME.PDF */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none hidden sm:block">
          <h1 className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase relative">
            <span className="absolute -left-[2px] -top-[1px] text-[#00e5ff] opacity-100 mix-blend-screen">RESUME.PDF</span>
            <span className="absolute -right-[2px] -bottom-[1px] text-[#ff00ff] opacity-100 mix-blend-screen">RESUME.PDF</span>
            <span className="relative text-[#6b7280] mix-blend-color-dodge">RESUME.PDF</span>
          </h1>
        </div>
        {/* Mobile View Title */}
        <h1 className="sm:hidden text-lg font-black tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          RESUME.PDF
        </h1>
        
        {/* Right: DOWNLOAD Button */}
        <a 
          href="/resume.pdf" 
          download="abhinavdasari.pdf"
          className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#ff00ff] border border-[#ff00ff]/60 rounded-full hover:bg-[#ff00ff]/10 hover:border-[#ff00ff] hover:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all duration-300"
        >
          <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">DOWNLOAD</span>
        </a>
      </div>

      {/* PDF Viewer Container */}
      <div className="relative z-10 flex-1 w-full h-full p-4 md:p-6 lg:padding-8 flex items-center justify-center pointer-events-none pb-12">
        <div className="w-full max-w-[1100px] h-full bg-[#111111] rounded-2xl border border-gray-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto flex flex-col items-center justify-center p-1 relative">
          
          <iframe 
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
            className="w-full h-full rounded-xl bg-white"
            title="Resume PDF"
          />

        </div>
      </div>

      {/* Bottom Watermark */}
      <div className="absolute bottom-4 left-6 z-20 pointer-events-none select-none">
        <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] text-[#002f20] uppercase">
          <span className="text-[#004d40]">PSK SYS_RESUME_VIEWER_V1.0</span> <span className="animate-pulse text-[#004d40]">_</span>
        </p>
      </div>

    </div>
  );
};

export default Resume;
