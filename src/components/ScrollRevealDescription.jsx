import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealDescription = ({ text, className, disableScroll = false }) => {
    const containerRef = useRef(null);

    const renderedText = useMemo(() => {
        return text.split(/(\s+)/).map((word, wIndex) => {
            if (word.match(/^\s+$/)) return word;
            return <span key={wIndex} className="inline-block bio-word opacity-10">{word}</span>;
        });
    }, [text]);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const wordElements = containerRef.current.querySelectorAll('.bio-word');
        const toProps = {
            ease: 'none',
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.05,
        };

        if (!disableScroll) {
            toProps.scrollTrigger = {
                trigger: containerRef.current,
                start: 'top bottom-=20%',
                end: 'bottom center',
                scrub: true
            };
        } else {
            toProps.duration = 0.5;
        }

        const anim = gsap.fromTo(wordElements,
            { opacity: 0.1, filter: "blur(3px)" },
            toProps
        );

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
    }, [text, disableScroll]);

    return (
        <div ref={containerRef} className={className}>
            {renderedText}
        </div>
    );
};

export default ScrollRevealDescription;
