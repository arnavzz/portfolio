import React from 'react';
import profileImage from '/assets/images/profile.png'; // Correct path for Vite from src folder

const About = () => (
    <section id="about" className="py-24 section-bg-light">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-light fade-in">About Me</h2>
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2 fade-in">
                        <img 
                            src={profileImage}
                            alt="Arnav Khamparia"
                            className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="md:col-span-3 fade-in" style={{ transitionDelay: '200ms' }}>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed text-justified">
                            Hi, I’m Arnav Khamparia an aspiring Machine Learning Engineer passionate about building intelligent systems that solve real-world problems. Currently pursuing my B.Tech in Artificial Intelligence and Machine Learning, I specialize in Natural Language Processing, prompt engineering, and model optimization. With a strong foundation in Python, data structures, and algorithmic thinking, I bring clarity and precision to complex technical challenges.
                        </p>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed text-justified">
                            Whether it’s designing AI agents, refining LLM prompts, or developing end-to-end ML pipelines, I thrive at the intersection of innovation and impact. I’m driven by curiosity, collaboration, and the pursuit of scalable, real-world solutions. Let’s build what’s next intelligently.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed text-justified">
                           When I'm not building models, I enjoy contributing to open-source projects, writing 
                            technical blogs. I believe in the power of 
                            AI to create positive impact and am always excited to work on challenging problems 
                            that push the boundaries of what's possible.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default About;