import React, { useEffect, useRef } from 'react';
import Icon from './Icon';
import { ICONS } from '../constants/icons';

const ProjectCard = ({ title, description, image, tech, link }) => {
    const cardRef = useRef(null);

    // This effect adds the 3D tilt interaction on mouse move.
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            // Calculate rotation based on mouse position relative to the card center
            const rotateX = (e.clientY - top - height / 2) / (height / 2) * -8;
            const rotateY = (e.clientX - left - width / 2) / (width / 2) * 8;
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        };

        const handleMouseLeave = () => {
            // Reset rotation when the mouse leaves the card
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        // Cleanup function to remove event listeners
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="project-card-container fade-in">
            <div ref={cardRef} className="project-card glass-effect rounded-xl overflow-hidden h-full flex flex-col">
                <div className="project-card-image">
                    <img src={image} alt={`${title} screenshot`} className="w-full h-56 object-cover" />
                </div>
                <div className="project-card-content p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed text-justified flex-grow">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tech.map((item) => (
                            <span key={item} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-accent transition-colors mt-auto">
                        <span>View Project</span>
                        <Icon path={ICONS.EXTERNAL_LINK} className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;