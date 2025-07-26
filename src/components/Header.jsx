import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { ICONS } from '../constants/icons';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Effect to handle scroll behavior for header background and active nav link
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = ['about', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 100;
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to smoothly scroll to a section
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-light">
                        Arnav Khamparia
                        <span className="block text-sm font-normal text-slate-400">
                            Machine Learning Engineer
                        </span>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`nav-link text-slate-300 hover:text-white font-medium ${
                                    activeSection === item.toLowerCase() ? 'active text-white' : ''
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                    
                    <button className="md:hidden p-2 text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                       <Icon path={ICONS.MENU} className="w-6 h-6" />
                    </button>
                </div>
                 {isMobileMenuOpen && (
                    <nav className="md:hidden mt-4 glass-effect rounded-lg p-4">
                        {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="block w-full text-left py-2 px-4 text-slate-300 hover:bg-slate-700 rounded"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;