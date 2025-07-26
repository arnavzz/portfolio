import React from 'react';
import Icon from './Icon';
import { ICONS } from '../constants/icons';

const Contact = () => {
     const handleSubmit = (e) => {
        e.preventDefault();
        // A simple alert for now, but this is where you'd integrate an email service
        alert('Thank you for your message! I\'ll get back to you soon.');
        e.target.reset();
    };

    const contactLinks = [
        { icon: ICONS.EMAIL, label: "Email", value: "arnavk2002@gmail.com", href: "mailto:arnavk2002@gmail.com" },
        { icon: ICONS.LINKEDIN, label: "LinkedIn", value: "linkedin.com/in/arnavkhamparia/", href: "https://linkedin.com/in/arnavkhamparia/" },
        { icon: ICONS.GITHUB, label: "GitHub", value: "github.com/arnavzz", href: "https://github.com/arnavzz" }
    ];

    return (
        <section id="contact" className="py-24 section-bg-dark">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-light fade-in">Get In Touch</h2>
                <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto glass-effect p-8 md:p-12 rounded-2xl">
                    <div className="fade-in">
                        <h3 className="text-3xl font-semibold mb-6 text-light">Let's Work Together</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed text-justified">
                            I'm always interested in new opportunities and exciting projects. Whether you're looking to build an ML solution, need consultation on AI strategy, or just want to discuss the latest in machine learning, I'd love to hear from you.
                        </p>
                        <div className="space-y-6">
                            {contactLinks.map(link => (
                                <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer" className="contact-icon-link flex items-center space-x-4 group">
                                    <div className="bg-slate-700 p-3 rounded-lg group-hover:bg-accent transition-colors">
                                        <Icon path={link.icon} className="w-6 h-6 text-light" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-light text-lg">{link.label}</p>
                                        <p className="text-slate-400 group-hover:text-accent transition-colors">{link.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="mt-10">
                            {/* The resume path points to the public folder */}
                            <a href="/assets/documents/resume.pdf" download className="contact-icon-link inline-flex items-center space-x-3 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                                <Icon path={ICONS.DOWNLOAD} className="w-5 h-5" />
                                <span>Download Resume</span>
                            </a>
                        </div>
                    </div>
                    
                    <div className="fade-in" style={{ transitionDelay: '200ms' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {['Name', 'Email'].map(field => (
                                <div key={field}>
                                    <label htmlFor={field.toLowerCase()} className="block text-sm font-medium text-slate-300 mb-2">{field}</label>
                                    <input type={field === 'Email' ? 'email' : 'text'} id={field.toLowerCase()} name={field.toLowerCase()} required className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors text-light" placeholder={`Your ${field.toLowerCase()}`} />
                                </div>
                            ))}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none text-light" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg font-semibold transition-transform duration-300 hover:scale-105">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;