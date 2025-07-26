import React from 'react';
import Icon from './Icon';
import { ICONS } from '../constants/icons';

const Footer = () => (
    <footer className="bg-slate-800 text-slate-400 py-8">
        <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <p className="text-lg font-semibold text-light">Arnav Khamparia</p>
                    <p>© {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                    {[
                        { href: "https://www.linkedin.com/in/arnavkhamparia/", icon: ICONS.LINKEDIN },
                        { href: "https://github.com/arnavzz", icon: ICONS.GITHUB },
                        { href: "mailto:arnavk2002@gmail.com", icon: ICONS.EMAIL }
                    ].map(item => (
                        <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors">
                            <Icon path={item.icon} className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;