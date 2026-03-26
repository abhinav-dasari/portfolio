import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import assets from '../assets/assets';
import SplitTextTitle from '../components/SplitTextTitle';
import ScrollRevealDescription from '../components/ScrollRevealDescription';
import CertificateModal from '../components/CertificateModal';

const Certificates = ({ theme }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedCert, setSelectedCert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isHoveredRef = useRef(false);

    const isDark = theme === 'dark';

    const slidesData = [
        {
            num: "01",
            title: "Interpersonal Communication for Engineering Leaders",
            desc: "Completed the 'Interpersonal Communication for Engineering Leaders' course authorized by Rice University and offered through Coursera. Developed strong communication, leadership, and collaboration skills essential for engineering professionals.",
            artist: "RICE UNIVERSITY",
            year: "2026",
            medium: "Soft Skills",
            verifyUrl: "https://www.coursera.org/account/accomplishments/verify/RDZ9VP2Y54U8"
        },
        {
            num: "02",
            title: "Essentials Automation Certification",
            desc: "Certified Essentials Automation Professional from Automation Anywhere, demonstrating foundational skills in Robotic Process Automation (RPA), bot creation, and automation workflows. This certification validates my ability to design, develop, and deploy automated solutions to improve business efficiency and productivity.",
            artist: "Automation Anywhere",
            year: "2025",
            medium: "Robotic Process Automation",
            verifyUrl: "https://certificates.automationanywhere.com/b49761e0-bb77-4b5c-a420-4f7af92e0b9e#acc.MlH43Xav"
        },
        {
            num: "03",
            title: "Build Generative AI Apps and Solutions with No-Code Tools",
            desc: `Completed the "Build Generative AI Apps and Solutions with No-Code Tools" course from Infosys through Infosys Springboard. This certification demonstrates my understanding of building Generative AI applications using modern no-code platforms and AI tools.`,
            artist: "Infosys",
            year: "2025",
            medium: "Generative AI",
            verifyUrl: "https://drive.google.com/file/d/17nGdzJS36B6u_IPNYNdiZdeLuEl_WcKk/view"
        },
        {
            num: "04",
            title: "Master Generative AI & Generative AI Tools (ChatGPT & more)",
            desc: `Successfully completed the "Master Generative AI & Generative AI Tools (ChatGPT & more)" program on Udemy. This certification reflects my proficiency in utilizing advanced Generative AI technologies, including ChatGPT, to develop intelligent and efficient digital solutions.`,
            artist: "Udemy",
            year: "2025",
            medium: "Generative AI",
            verifyUrl: "https://www.udemy.com/certificate/UC-48fe908d-747f-44f8-a1e7-083443caf7ea/"
        },
        {
            num: "05",
            title: "Build Your Own Chatbot",
            desc: `Completed the "Build Your Own Chatbot" certification provided by IBM through the IBM Developer Skills Network. This certification demonstrates my ability to design and develop AI-powered chatbot solutions using modern conversational AI technologies.`,
            artist: "IBM",
            year: "2025",
            medium: "Generative AI",
            verifyUrl: "https://courses.cognitiveclass.ai/certificates/d9ee98c3a8644e1eb43f31622213b55f"
        },
        {
            num: "06",
            title: "Design and Analysis of Algorithms",
            desc: `Successfully completed the "Design and Analysis of Algorithms" course through NPTEL offered by Indian Institute of Technology Madras. This certification highlights my understanding of algorithm design techniques, computational complexity, and efficient problem-solving strategies in computer science.`,
            artist: "IIT Madras",
            year: "2025",
            medium: "Computer Science",
            verifyUrl: "https://drive.google.com/file/d/1Nzo21SyXVba0032imfYodrgcTYLavrg2/view?usp=sharing"
        }
    ];
    const slidesRow = slidesData.map((d, i) => ({
        ...d,
        image: [assets.certif1, assets.certif2, assets.certif3, assets.certif4, assets.certif5, assets.certif6][i]
    }));

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
            snapDelay: 300,
            lerpSpeed: 0.06
        };

        const scene = new THREE.Scene();
        // No fog/background — let site background show through

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, CONFIG.camZ);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0); // fully transparent — site bg shows through
        canvasRef.current.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.3 : 0.6);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, isDark ? 0.2 : 0.5);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const galleryGroup = new THREE.Group();
        scene.add(galleryGroup);

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
        let mouse = new THREE.Vector2(0, 0);
        const raycaster = new THREE.Raycaster();
        let animationFrameId;

        // Window-level wheel blocker: only intercepts when mouse is over this section
        const handleWheel = (e) => {
            if (!isHoveredRef.current) return;
            e.preventDefault();
            targetScroll += e.deltaY * 0.15;
        };

        let touchStart = 0;

        const handleTouchStart = (e) => {
            touchStart = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const diff = touchStart - e.touches[0].clientY;
            targetScroll += diff * 0.6;
            touchStart = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {};

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

        const totalWidth = CONFIG.slideCount * CONFIG.spacingX;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            let isImageHovered = false;
            if (isHoveredRef.current) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(paintingGroups, true);
                if (intersects.length > 0) {
                    isImageHovered = true;
                }
            }

            if (!isImageHovered) {
                targetScroll += 0.05;
            }

            currentScroll = THREE.MathUtils.lerp(currentScroll, targetScroll, 0.05);

            const xMove = currentScroll * Math.cos(CONFIG.wallAngleY);
            const zMove = currentScroll * Math.sin(CONFIG.wallAngleY);

            camera.position.x = xMove;
            camera.position.z = CONFIG.camZ - zMove;

            paintingGroups.forEach((group, i) => {
                const originalX = i * CONFIG.spacingX;
                let relativeDist = (originalX - currentScroll) % totalWidth;
                
                if (relativeDist < -totalWidth / 2) relativeDist += totalWidth;
                else if (relativeDist > totalWidth / 2) relativeDist -= totalWidth;

                const wrappedX = currentScroll + relativeDist;
                group.position.x = wrappedX;

                const distance = Math.abs(relativeDist);
                const scale = THREE.MathUtils.clamp(1.3 - distance * 0.02, 1, 1.3);

                group.scale.set(scale, scale, 1);
                group.position.z = -distance * 0.05;
            });

            camera.rotation.x += (mouse.y * 0.08 - camera.rotation.x) * 0.05;
            camera.rotation.y += (-mouse.x * 0.08 - camera.rotation.y) * 0.05;

            updateUI(currentScroll);
            renderer.render(scene, camera);
        };

        // Attach to WINDOW (non-passive) so we can preventDefault page scroll while hovered
        window.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('mousemove', handleMouseMove);

        const handleMouseEnter = () => { isHoveredRef.current = true; };
        const handleMouseLeave = () => { isHoveredRef.current = false; };
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        const handleClick = (e) => {
            if (isHoveredRef.current) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(paintingGroups, true);
                if (intersects.length > 0) {
                    // Find which group was clicked
                    let clickedGroup = intersects[0].object.parent;
                    const index = paintingGroups.indexOf(clickedGroup);
                    if (index !== -1) {
                        setSelectedCert(slidesRow[index]);
                        setIsModalOpen(true);
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        container.addEventListener('click', handleClick);
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('click', handleClick);
            if (canvasRef.current && renderer.domElement) {
                canvasRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };

    }, [isDark]);

    // Ref to control targetScroll from outside the effect
    const scrollRef = useRef(null);

    return (
        <section
            id="cer"
            ref={containerRef}
            className="relative w-full h-[100vh] overflow-hidden"
        >
            <div ref={canvasRef} className="absolute inset-0" />

            {/* ── Section Header (matches AboutMe style) ── */}
            <div className="absolute top-20 left-[5%] z-20 pointer-events-none">
                <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
                    Certificates
                </p>
                <SplitTextTitle 
                    text="My Achievements"
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-16 inline-block pointer-events-auto overflow-visible"
                />
            </div>

            {/* ── Slide Info Panels ── */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {slidesRow.map((slide, index) => (
                    <div key={index}
                        className={`absolute top-auto bottom-[5%] md:bottom-auto md:top-[20%] left-[5%] w-[90%] md:w-[40%] xl:w-[30%]
                        bg-white/60 dark:bg-black/50 md:bg-transparent md:dark:bg-transparent
                        backdrop-blur-sm md:backdrop-blur-none
                        p-6 md:p-0 rounded-2xl md:rounded-none
                        transition-all duration-1000 flex flex-col
                        ${activeSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:translate-y-0 pointer-events-none'}`}>

                        <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4 md:mb-8 uppercase">
                            <span>{slide.num} / CERTIFICATES</span>
                            <div className="flex-grow h-[1px] bg-gray-300 dark:bg-gray-700 md:bg-gray-200 md:dark:bg-gray-800"></div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 md:mb-6 leading-[1.1] text-gray-900 dark:text-gray-100">
                            {slide.title}
                        </h1>

                        {activeSlide === index && (
                            <ScrollRevealDescription 
                                text={slide.desc} 
                                className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 md:text-gray-500 md:dark:text-gray-400 mb-6 md:mb-16 leading-relaxed text-left md:text-justify line-clamp-4 md:line-clamp-none"
                                disableScroll={true}
                            />
                        )}
                        {activeSlide !== index && (
                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 md:text-gray-500 md:dark:text-gray-400 mb-6 md:mb-16 leading-relaxed text-left md:text-justify line-clamp-4 md:line-clamp-none opacity-0">
                                {slide.desc}
                            </p>
                        )}

                        <div className="flex flex-col gap-2 md:gap-3 text-[10px] md:text-xs tracking-[0.2em] mb-4 md:mb-8 w-full">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-16 sm:w-20 md:w-24 uppercase">ISSUER</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100 truncate">{slide.artist}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-16 sm:w-20 md:w-24 uppercase">YEAR</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100">{slide.year}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 w-16 sm:w-20 md:w-24 uppercase">TECH</span>
                                <span className="italic font-serif text-gray-900 dark:text-gray-100 truncate">{slide.medium}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] text-gray-500 dark:text-gray-400 w-full uppercase mt-2 md:mt-8 relative md:absolute md:-bottom-12 md:left-0 pointer-events-auto">
                            <button 
                                onClick={() => { setSelectedCert(slide); setIsModalOpen(true); }}
                                className="whitespace-nowrap hover:text-orange-500 transition-colors cursor-pointer"
                            >
                                CLICK CARD TO VIEW
                            </button>
                            <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700 md:bg-gray-200 md:dark:bg-gray-800"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Dot Navigation ── */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
                {slidesRow.map((_, index) => (
                    <div
                        key={index}
                        className={`rounded-full transition-all duration-300 pointer-events-auto cursor-pointer
                            ${activeSlide === index
                                ? 'w-2 h-5 bg-gray-800 dark:bg-gray-100'
                                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400'
                            }`}
                        onClick={() => {
                            if (scrollRef.current !== null) {
                                scrollRef.current = index * 25;
                            }
                        }}
                    />
                ))}
            </div>

            <CertificateModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                certificate={selectedCert}
            />
        </section>
    );
};

export default Certificates;