import React, { useState, useEffect, useRef } from 'react';
import VANTA from 'vanta/dist/vanta.net.min'; // Import Vanta
import * as THREE from 'three'; // Vanta requires Three.js

const Hero = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(0);

    // Initialize Vanta.js effect
    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(VANTA({
                el: vantaRef.current,
                THREE: THREE, // Pass the THREE object to Vanta
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: '#10b981',
                backgroundColor: '#0f172a',
                points: 12.00,
                maxDistance: 25.00,
                spacing: 18.00
            }));
        }
        // Cleanup function to destroy the Vanta effect on component unmount
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        }
    }, [vantaEffect]);
    
    return (
        <section ref={vantaRef} id="hero" className="min-h-screen flex items-center justify-center text-white relative">
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                    Engineering Intelligence
                    <span className="block text-accent">with purpose</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-300 fade-in" style={{ transitionDelay: '200ms' }}>
                   Crafting scalable AI systems and smarter workflows that power real-world impact through precision, performance, and innovation.
                </p>
                <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl fade-in"
                    style={{ transitionDelay: '400ms' }}
                >
                    Explore My Work
                </button>
            </div>
        </section>
    );
};

export default Hero;