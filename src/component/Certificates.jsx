import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import assets from '../assets/assets';

const Certificates = ({ theme }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const isDark = theme === 'dark';

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const images = [
            assets.certif1,
            assets.certif2,
            assets.certif3,
            assets.certif4,
            assets.certif5,
            assets.certif6
        ];

        const CONFIG = {
            slideCount: images.length,
            spacingX: 25,
            pWidth: 12,
            pHeight: 7,
            camZ: 32,
            wallAngleY: -0.25,
            snapDelay: 200,
            lerpSpeed: 0.06
        };

        const totalGalleryWidth = CONFIG.slideCount * CONFIG.spacingX;

        const scene = new THREE.Scene();
        const bgColor = isDark ? 0x050505 : 0xf7f7f5;
        scene.fog = new THREE.Fog(bgColor, 10, 110);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, CONFIG.camZ);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasRef.current.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.3 : 0.6);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.2 : 0.5);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const galleryGroup = new THREE.Group();
        scene.add(galleryGroup);

        const textureLoader = new THREE.TextureLoader();
        const planeGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);

        const paintingGroups = [];

        for (let i = 0; i < CONFIG.slideCount; i++) {

            const group = new THREE.Group();
            group.position.set(i * CONFIG.spacingX, 0, 0);

            const texture = new THREE.Texture();
            const img = new Image();
            img.src = images[i];
            img.onload = () => {
                texture.image = img;
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.needsUpdate = true;
                mat.needsUpdate = true;
            };

            const mat = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide
            });
            const mesh = new THREE.Mesh(planeGeo, mat);

            const edges = new THREE.EdgesGeometry(planeGeo);
            const outline = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({
                    color: isDark ? 0x444444 : 0x222222
                })
            );

            const shadowGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);
            const shadowMat = new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: isDark ? 0.5 : 0.15
            });

            const shadow = new THREE.Mesh(shadowGeo, shadowMat);
            shadow.position.set(0.8, -0.8, -0.5);

            group.add(shadow);
            group.add(mesh);
            group.add(outline);

            galleryGroup.add(group);
            paintingGroups.push(group);
        }

        galleryGroup.rotation.y = CONFIG.wallAngleY;
        galleryGroup.position.x = 8;

        let currentScroll = 0;
        let targetScroll = 0;
        let snapTimer = null;
        let mouse = { x: 0, y: 0 };
        let animationFrameId;

        const snapToNearest = () => {
            const index = Math.round(targetScroll / CONFIG.spacingX);
            targetScroll = index * CONFIG.spacingX;
        };

        const handleWheel = (e) => {

            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                targetScroll += e.deltaX * 0.1;
            } else {
                targetScroll += e.deltaY * 0.1;
            }

            if (snapTimer) clearTimeout(snapTimer);
            snapTimer = setTimeout(snapToNearest, CONFIG.snapDelay);
        };

        let touchStart = 0;

        const handleTouchStart = (e) => {
            touchStart = e.touches[0].clientX;
            if (snapTimer) clearTimeout(snapTimer);
        };

        const handleTouchMove = (e) => {
            const diff = touchStart - e.touches[0].clientX;
            targetScroll += diff * 0.6;
            touchStart = e.touches[0].clientX;
            if (snapTimer) clearTimeout(snapTimer);
        };

        const handleTouchEnd = () => snapToNearest();

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();

            mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
        };

        const updateUI = (scrollX) => {
            const rawIndex = Math.round(scrollX / CONFIG.spacingX);
            const safeIndex =
                ((rawIndex % CONFIG.slideCount) + CONFIG.slideCount) %
                CONFIG.slideCount;

            setActiveSlide(safeIndex);
        };

        const animate = () => {

            animationFrameId = requestAnimationFrame(animate);

            currentScroll = THREE.MathUtils.lerp(
                currentScroll,
                targetScroll,
                0.05
            );

            const xMove = currentScroll * Math.cos(CONFIG.wallAngleY);
            const zMove = currentScroll * Math.sin(CONFIG.wallAngleY);

            camera.position.x = xMove;
            camera.position.z = CONFIG.camZ - zMove;

            paintingGroups.forEach((group, i) => {

                const originalX = i * CONFIG.spacingX;
                const distFromCam = currentScroll - originalX;

                const shift =
                    Math.round(distFromCam / totalGalleryWidth) *
                    totalGalleryWidth;

                group.position.x = originalX + shift;

                const distance = Math.abs(distFromCam);

                const scale = THREE.MathUtils.clamp(
                    1.3 - distance * 0.02,
                    1,
                    1.3
                );

                group.scale.set(scale, scale, 1);
                group.position.z = -distance * 0.05;
            });

            camera.rotation.x +=
                (mouse.y * 0.08 - camera.rotation.x) * 0.05;

            camera.rotation.y +=
                (-mouse.x * 0.08 - camera.rotation.y) * 0.05;

            updateUI(currentScroll);
            renderer.render(scene, camera);
        };

        container.addEventListener('wheel', handleWheel, { passive: true });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {

            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (canvasRef.current && renderer.domElement) {
                canvasRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };

    }, [isDark]);

    const slides = [
        { 
            num: "01", 
            title: "Interpersonal Communication for Engineering Leaders", 
            desc: "Completed the 'Interpersonal Communication for Engineering Leaders' course authorized by Rice University and offered through Coursera. Developed strong communication, leadership, and collaboration skills essential for engineering professionals.", 
            artist: "RICE UNIVERSITY", 
            year: "2026", 
            medium: "Soft Skills" 
        },
        { 
            num: "02", 
            title: "Essentials Automation Certification", 
            desc: "Certified Essentials Automation Professional from Automation Anywhere, demonstrating foundational skills in Robotic Process Automation (RPA), bot creation, and automation workflows. This certification validates my ability to design, develop, and deploy automated solutions to improve business efficiency and productivity.", 
            artist: "Automation Anywhere", 
            year: "2025", 
            medium: "Robotic Process Automation" 
        },
        { 
            num: "03", 
            title: "Build Generative AI Apps and Solutions with No-Code Tools", 
            desc: "Completed the “Build Generative AI Apps and Solutions with No-Code Tools” course from Infosys through Infosys Springboard. This certification demonstrates my understanding of building Generative AI applications using modern no-code platforms and AI tools.", 
            artist: "Infosys", 
            year: "2025", 
            medium: "Generative AI" 
        },
        { 
            num: "04", 
            title: "Master Generative AI & Generative AI Tools (ChatGPT & more)", 
            desc: "Successfully completed the “Master Generative AI & Generative AI Tools (ChatGPT & more)” program on Udemy. This certification reflects my proficiency in utilizing advanced Generative AI technologies, including ChatGPT, to develop intelligent and efficient digital solutions.", 
            artist: "Udemy", 
            year: "2025", 
            medium: "Generative AI" 
        },
        { 
            num: "05", 
            title: "Build Your Own Chatbot", 
            desc: "Completed the “Build Your Own Chatbot” certification provided by IBM through the IBM Developer Skills Network. This certification demonstrates my ability to design and develop AI-powered chatbot solutions using modern conversational AI technologies.", 
            artist: "IBM", 
            year: "2025", 
            medium: "Generative AI" 
        },
        { 
            num: "06", 
            title: "Design and Analysis of Algorithms", 
            desc: "Successfully completed the “Design and Analysis of Algorithms” course through NPTEL offered by Indian Institute of Technology Madras. This certification highlights my understanding of algorithm design techniques, computational complexity, and efficient problem-solving strategies in computer science.", 
            artist: "IIT Madras", 
            year: "2025", 
            medium: "Computer Science" 
        }
    ];

    return (
        <section id="cer" ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-[#f7f7f5] dark:bg-[#050505]">
            <div ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 pointer-events-none">
                {slides.map((slide, index) => (
                    <div key={index}
                        className={`absolute top-[20%] left-[5%] w-[80%] md:w-[40%] xl:w-[30%]
                        transition-all duration-1000
                        ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                        
                        <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8 uppercase">
                            <span>{slide.num} / CERTIFICATES</span>
                            <div className="flex-grow h-[1px] bg-gray-200 dark:bg-gray-800"></div>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif italic mb-6 leading-[1.1] text-gray-900 dark:text-gray-100">
                            {slide.title}
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-16 leading-relaxed text-justify">
                            {slide.desc}
                        </p>

                        <div className="flex flex-col gap-3 text-[10px] md:text-xs tracking-[0.2em] mb-8 w-full">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 dark:text-gray-500 w-24 uppercase">ISSUER</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100">{slide.artist}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 dark:text-gray-500 w-24 uppercase">YEAR</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100">{slide.year}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 dark:text-gray-500 w-24 uppercase">TECH</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100">{slide.medium}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 w-full uppercase mt-8 absolute bottom-0 left-0 lg:-bottom-12">
                            <span className="whitespace-nowrap">SCROLL HORIZONTALLY OR DRAG TO EXPLORE</span>
                            <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"></div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;