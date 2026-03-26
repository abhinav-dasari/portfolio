import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import BorderGlow from '../components/BorderGlow';
import SplitTextTitle from '../components/SplitTextTitle';
import ScrollRevealDescription from '../components/ScrollRevealDescription';
import Magnet from '../components/Magnet';
import StarBorder from '../components/StarBorder';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    institution: 'Lovely Professional University',
    duration: '2023 – 2027',
    grade: 'CGPA: 6.82 / 10',
    description: 'Pursuing a B.Tech with a specialization in AI & ML. Core coursework includes machine learning, deep learning, computer vision, data structures, algorithms, and database systems.',
    highlights: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Structures', 'Algorithms'],
    color: 'from-violet-600 to-purple-700',
    icon: '🎓',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    specialization: 'Mathematics, Physics & Chemistry',
    institution: 'TMR School Madhira',
    duration: '2021 – 2023',
    grade: 'Percentage: 90.01%',
    description: 'Completed higher secondary education with a focus on Science and Mathematics, building a strong foundation for engineering studies.',
    highlights: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Telugu'],
    color: 'from-emerald-600 to-teal-600',
    icon: '🏫',
  },
  {
    degree: 'Secondary Education (10th)',
    specialization: 'General Science & Mathematics',
    institution: 'TMR School/Junior College Madhira',
    duration: '2020 – 2021',
    grade: 'CGPA: 10/10',
    description: 'Completed secondary schooling with distinction, developing core analytical and problem-solving skills across science and mathematics subjects.',
    highlights: ['Mathematics', 'Science', 'Social Studies', 'Biology', 'Telugu', 'Hindi', 'English'],
    color: 'from-orange-600 to-amber-600',
    icon: '📚',
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#060010] px-4 sm:px-12 lg:px-24 xl:px-40">

      <div className="relative z-10 mb-16">
        {/* Header */}
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Education</p>
        <SplitTextTitle 
            text="Academic Background"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
        />
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg">
          Scroll through my educational journey — cards stack as you scroll down.
        </p>
      </div>

      <ScrollStack
        itemDistance={100}
        itemScale={0.03}
        itemStackDistance={30}
        stackPosition="20%"
        scaleEndPosition="10%"
        baseScale={0.85}
        rotationAmount={0}
        blurAmount={0}
        useWindowScroll={true}
      >
        {education.map((edu, i) => (
          <ScrollStackItem
            key={i}
            itemClassName={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800`}
          >
            <BorderGlow 
              className="w-full h-full rounded-2xl"
              backgroundColor="transparent"
              glowColor="40 80 80"
              borderRadius={16}
              animated={false}
            >
              <div className="flex flex-col h-full justify-between p-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Icon circle */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                      {edu.icon}
                    </div>
                    <div>
                      <SplitTextTitle 
                          text={edu.degree}
                          className="text-lg font-bold text-gray-900 dark:text-white leading-tight"
                      />
                      <p className="text-sm text-primary font-medium mt-0.5">{edu.specialization}</p>
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="flex-shrink-0">
                    <Magnet padding={50} disabled={false} magnetStrength={10}>
                      <StarBorder
                        as="div"
                        className="!rounded-full"
                        color="#5044e5"
                        speed="4s"
                        thickness={1.5}
                        innerClassName="relative z-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 whitespace-nowrap block cursor-default hover:text-primary transition-colors duration-200"
                      >
                        {edu.duration}
                      </StarBorder>
                    </Magnet>
                  </div>
                </div>

                {/* Institution & grade */}
                <div className="flex items-center gap-3 mt-4">
                  <ScrollRevealDescription 
                      text={edu.institution}
                      className="text-sm text-gray-500 dark:text-gray-400"
                  />
                  <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{edu.grade}</span>
                </div>

                {/* Description */}
                <ScrollRevealDescription 
                    text={edu.description} 
                    className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3" 
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-2">
                  {edu.highlights.map((h) => (
                    <Magnet key={h} padding={50} disabled={false} magnetStrength={10}>
                      <StarBorder
                        as="div"
                        className="!rounded-full"
                        color="#5044e5"
                        speed="4s"
                        thickness={1.5}
                        innerClassName="relative z-1 text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors duration-200 cursor-default block"
                      >
                        {h}
                      </StarBorder>
                    </Magnet>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </ScrollStackItem>
        ))}
      </ScrollStack>

    </section>
  );
};

export default Education;
