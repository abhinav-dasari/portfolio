import React from 'react';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="text-sm font-medium tracking-widest hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
        >
          <span>&larr;</span> BACK TO BASE
        </button>
        
        <h1 className="text-lg font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          RESUME.PDF
        </h1>
        
        <a 
          href="/resume.pdf" 
          download="abhinavdasari.pdf"
          className="text-sm font-medium tracking-widest px-4 py-2 border border-white/20 rounded-full hover:border-purple-400 hover:text-purple-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          DOWNLOAD
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full h-full p-4 md:p-8 bg-black/40">
        <iframe 
          src="/resume.pdf" 
          className="w-full h-full rounded-xl border border-white/10 shadow-2xl bg-white"
          title="Resume PDF"
        />
      </div>
    </div>
  );
};

export default Resume;
