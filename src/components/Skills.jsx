import React from 'react';

const Skills = () => {
    const skillCategories = [
        { title: "Machine Learning", skills: ["TensorFlow", "PyTorch", "Scikit-learn", "LangGraph", "Prompt Engineering", "LLMs", "RAG"] },
        { title: "Programming", skills: ["Python", "C++", "SQL"] },
        { title: "Domains", skills: ["Deep Learning","Genrative AI", "NLP", "Computer Vision", "Data Structures and Algorithm"] },
        { title: "Tools and Platforms", skills: ["Git", "RestAPIs", "AWS"] }
    ];

    return (
        <section id="skills" className="py-24 section-bg-light">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-light fade-in">Skills & Expertise</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-pod fade-in" style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="skill-pod-inner glass-effect p-6 rounded-lg h-full">
                                <h3 className="text-2xl font-semibold mb-6 text-primary" style={{ transform: 'translateZ(20px)' }}>{category.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill) => (
                                        <div key={skill} className="skill-badge bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-medium cursor-default">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;