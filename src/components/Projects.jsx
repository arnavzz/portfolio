import React from 'react';
import ProjectCard from './ProjectCard';
// Importing project images
import project1Img from '/assets/images/project1.jpg';
import project2Img from '/assets/images/project2.png';
import project3Img from '/assets/images/project3.jpg';
import project4Img from '/assets/images/project4.png';

const Projects = () => {
     const projects = [
        {
            title: "LangGraph Agentic Workflow",
            description: "Developed an Enhanced Super-Resolution Generative Adversarial Network (ESRGAN) tasks for Nmap, Gobuster, FFUF, and SQLmap, reducing scan time by 50% (60–240 seconds) via concurrent processing. Built a Streamlit dashboard for real-time vulnerability tracking, enhancing user interaction and reporting accuracy for cybersecurity workflows.",
            image: project1Img,
            tech: ["Python", "LangGraph", "LLM", "Regex"],
            link: "https://arnavzz-langgraph-agentic-workflow-app-nqwjzw.streamlit.app/"
        },
        {
            title: "Super Resolution",
            description: "Developed an Enhanced Super-Resolution Generative Adversarial Network (ESRGAN) using Python and TensorFlow, outperforming state-of-the-art methods in sharpness and detail recovery for high-quality image upscaling. Enhanced GAN Discriminator to improve visual quality, optimized via concurrent programming for efficient training.",
            image: project2Img,
            tech: ["PyTorch", "Tensorflow", "GAN", "RRDB"],
            link: "#"
        },
        {
            title: "Liver Tumor Segmentation with U-Net, V-Net and AH-Net Using MONAI",
            description: "Liver tumor segmentation plays a vital role in diagnosis and treatment. This study compares the performance of U-Net, AH-Net, and V-Net models using the MONAI framework on liver CT scans. U-Net achieved a Dice score of 0.92 but faced challenges in capturing fine details. V-Net excelled in volumetric segmentation, achieving the highest Dice score of 0.93. AH-Net, despite incorporating an attention mechanism, exhibited limitations, resulting in a Dice score of 0.89.",
            image: project3Img,
            tech: ["MONAI", "U-Net", "V-Net", "Medical AI"],
            link: "https://link.springer.com/chapter/10.1007/978-981-96-3333-3_6"
        },
        {
            title: "Generative AI SEO Content Augmenter",
            description: "Developed a Generative AI tool to analyze top-ranking SERP results and strategically augment existing content. The application identifies competitive content gaps and generates value-add sections including FAQs, Myth vs. Fact tables, and SEO-optimized Schema markup, enhancing articles for improved reader engagement and search performance. Built with React and Tailwind CSS to create a responsive and intuitive interface for marketers.",
            image: project4Img,
            tech: ["RAG", "LLM", "SEO", "Generative AI"],
            link: "https://augai.netlify.app/"
        }
    ];
    
    return (
        <section id="projects" className="py-24 section-bg-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-light fade-in">Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                </div>
            </div>
        </section>
    );
};

export default Projects;