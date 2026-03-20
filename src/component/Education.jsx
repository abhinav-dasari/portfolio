import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning',
    institution: 'Your University Name',
    duration: '2022 – 2026',
    grade: 'CGPA: 8.5 / 10',
    description: 'Pursuing a B.Tech with a specialization in AI & ML. Core coursework includes machine learning, deep learning, computer vision, data structures, algorithms, and database systems.',
    highlights: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Structures', 'Algorithms'],
    color: 'from-violet-600 to-purple-700',
    icon: '🎓',
  },
  {
    degree: 'Minor — Robotic Process Automation',
    specialization: 'RPA & Intelligent Automation',
    institution: 'Your University Name',
    duration: '2023 – 2026',
    grade: 'Ongoing',
    description: 'A dedicated minor program in Robotic Process Automation covering UiPath, workflow automation, bot development, and enterprise automation frameworks.',
    highlights: ['UiPath', 'Bot Development', 'Workflow Automation', 'Enterprise Automation'],
    color: 'from-blue-600 to-cyan-600',
    icon: '🤖',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    specialization: 'Mathematics, Physics & Chemistry',
    institution: 'Your School Name',
    duration: '2020 – 2022',
    grade: 'Percentage: 90%+',
    description: 'Completed higher secondary education with a focus on Science and Mathematics, building a strong foundation for engineering studies.',
    highlights: ['Mathematics', 'Physics', 'Chemistry', 'Science'],
    color: 'from-emerald-600 to-teal-600',
    icon: '🏫',
  },
  {
    degree: 'Secondary Education (10th)',
    specialization: 'General Science & Mathematics',
    institution: 'Your School Name',
    duration: '2019 – 2020',
    grade: 'Percentage: 90%+',
    description: 'Completed secondary schooling with distinction, developing core analytical and problem-solving skills across science and mathematics subjects.',
    highlights: ['Mathematics', 'Science', 'English', 'Social Studies'],
    color: 'from-orange-600 to-amber-600',
    icon: '📚',
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40">

      {/* Header */}
      <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Education</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Academic Background</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-12 max-w-lg">
        Scroll through my educational journey — cards stack as you scroll down.
      </p>

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
            <div className="flex flex-col h-full justify-between">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Icon circle */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {edu.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{edu.specialization}</p>
                  </div>
                </div>
                {/* Duration badge */}
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                  {edu.duration}
                </span>
              </div>

              {/* Institution & grade */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{edu.grade}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                {edu.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

    </section>
  );
};

export default Education;
