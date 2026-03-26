import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitTextTitle = ({ text, className }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;
        const charElements = textRef.current.querySelectorAll('.char');
        
        const anim = gsap.fromTo(charElements,
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

        return () => {
            if (anim.scrollTrigger) {
                anim.scrollTrigger.kill();
            }
            anim.kill();
        };
    }, []);

    const titleText = text.split('').map((char, index) => (
        <span className="inline-block char" key={index}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <h2 ref={textRef} className={`overflow-hidden ${className}`}>
            {titleText}
        </h2>
    );
};

export default SplitTextTitle;
