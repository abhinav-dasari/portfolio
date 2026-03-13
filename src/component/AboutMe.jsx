import React from 'react';

const interests = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Robotic Process Automation',
    'Intelligent Automation',
];

const AboutMe = () => {
    return (
        <section
            id="about"
            className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 dark:bg-black bg-white"
        >
            {/* Section Label */}
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
                About Me
            </p>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Who I Am
            </h2>

            <div className="grid lg:grid-cols-5 gap-12 items-start">

                {/* Bio Text */}
                <div className="lg:col-span-3 space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                    <p>
                        Hi, I'm <span className="font-semibold text-gray-900 dark:text-white">Abhinav Dasari</span>, a B.Tech student majoring in{' '}
                        <span className="text-primary font-medium">Computer Science and Engineering (Artificial Intelligence &amp; Machine Learning)</span>{' '}
                        with a minor in{' '}
                        <span className="text-primary font-medium">Robotic Process Automation (RPA)</span>.
                        I am passionate about technology and enjoy learning how intelligent systems and automation
                        can solve real-world problems.
                    </p>
                    <p>
                        My academic focus is on AI, Machine Learning, and Automation, and I continuously work on
                        improving my skills in programming, problem-solving, and software development. I enjoy
                        building projects that combine modern technologies, intelligent algorithms, and practical
                        applications.
                    </p>
                    <p>
                        I am particularly interested in exploring areas such as Artificial Intelligence, Deep
                        Learning, Computer Vision, and intelligent automation systems. I believe in continuous
                        learning and actively work on developing projects that strengthen my technical knowledge
                        and creativity.
                    </p>
                    <p>
                        My goal is to grow as an <span className="font-semibold text-gray-900 dark:text-white">AI/ML engineer and automation specialist</span>,
                        contributing to innovative solutions that make technology more efficient and impactful.
                    </p>
                </div>

                {/* Interests Card */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-6">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
                            Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="text-xs font-medium px-3 py-1.5 rounded-full
                                               bg-white dark:bg-gray-800
                                               border border-gray-200 dark:border-gray-700
                                               text-gray-700 dark:text-gray-300
                                               hover:border-primary hover:text-primary
                                               transition-colors duration-200 cursor-default"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-5 border-t border-gray-100 dark:border-gray-800" />

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">B.Tech</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">CSE — AI &amp; ML</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">RPA</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Minor</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
