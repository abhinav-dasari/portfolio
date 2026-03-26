import React, { useRef, useState, useEffect } from 'react';
import assets from '../assets/assets';
import BorderGlow from '../components/BorderGlow';
import SplitTextTitle from '../components/SplitTextTitle';
import ScrollRevealDescription from '../components/ScrollRevealDescription';

const ContactMe = ({ theme }) => {
    const isDark = theme === 'dark';
    const formRef = useRef();
    const [status, setStatus] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("Sending....");
        
        // This is a placeholder for actual form submission logic (e.g. Web3Forms, EmailJS, etc)
        // For now, we simulate a network request
        setTimeout(() => {
            setStatus("Message sent successfully!");
            event.target.reset();
            setTimeout(() => setStatus(""), 3000);
        }, 1500);
    };

    return (
        <section
            id="contact"
            className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 relative z-10"
        >
            {/* Section Label */}
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 text-center lg:text-left">
                Get In Touch
            </p>

            {/* Section Title */}
            <SplitTextTitle 
                text="Contact Me"
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center lg:text-left inline-block lg:block overflow-visible"
            />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                {/* Left Side: Contact Info */}
                <div className="flex flex-col gap-8">
                    <ScrollRevealDescription 
                        text="I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
                        className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]"
                    />

                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                <a href="mailto:abhinav@example.com" className="text-gray-900 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                                    abhinav@example.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">Location</p>
                                <p className="text-gray-900 dark:text-gray-200 font-medium">
                                    India
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <BorderGlow
                    className="bg-gray-50 dark:bg-gray-900/40 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 w-full"
                    backgroundColor="transparent"
                    borderRadius={24}
                    glowColor="40 80 80"
                    animated={false}
                >
                    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-6 relative z-10 w-full">
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                required 
                                placeholder="John Doe"
                                className="px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                required 
                                placeholder="john@example.com"
                                className="px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea 
                                id="message"
                                name="message" 
                                required 
                                rows="5"
                                placeholder="How can I help you?"
                                className="px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900 dark:text-white resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="bg-primary text-white font-medium py-3.5 px-8 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                        >
                            Send Message
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>

                        {status && (
                            <p className={`text-sm text-center ${status.includes('success') ? 'text-green-500' : 'text-primary'}`}>
                                {status}
                            </p>
                        )}
                    </form>
                </BorderGlow>

            </div>
        </section>
    );
};

export default ContactMe;
