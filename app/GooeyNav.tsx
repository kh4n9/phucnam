"use client";

import { useRef, useEffect, useState } from 'react';

interface NavItem {
    label: string;
    href: string;
}

interface GooeyNavProps {
    items: NavItem[];
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    initialActiveIndex?: number;
    animationTime?: number;
    timeVariance?: number;
    colors?: number[];
    className?: string;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
    items,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    initialActiveIndex = 0,
    animationTime = 600,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    className = ''
}) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        color: number;
        delay: number;
    }>>([]);
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    // Color palette using the specified colors
    const colorPalette = [
        '#C5A059', // Luxury Gold
        '#D4AF37', // Alternative Gold
        '#144272', // Royal Navy
        '#0A2647', // Dark Navy
    ];

    useEffect(() => {
        // Generate particles
        const newParticles = [];
        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * particleDistances[0] - particleDistances[0] / 2,
                y: Math.random() * particleDistances[1] - particleDistances[1] / 2,
                color: colors[i % colors.length],
                delay: Math.random() * timeVariance,
            });
        }
        setParticles(newParticles);
    }, [particleCount, particleDistances, colors, timeVariance]);

    useEffect(() => {
        const updateIndicator = () => {
            const activeItem = itemRefs.current[activeIndex];
            if (activeItem && navRef.current) {
                const navRect = navRef.current.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                setIndicatorStyle({
                    left: itemRect.left - navRect.left,
                    width: itemRect.width,
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeIndex]);

    const handleClick = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveIndex(index);
    };

    return (
        <nav
            ref={navRef}
            className={`gooey-nav ${className}`}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '50px',
                background: 'rgba(10, 38, 71, 0.1)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Gooey indicator */}
            <div
                className="gooey-indicator"
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    height: '36px',
                    background: 'linear-gradient(45deg, #DFBD69, #926F34)',
                    borderRadius: '25px',
                    transition: `all ${animationTime}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    zIndex: 0,
                    boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)',
                }}
            >
                {/* Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: `${particleR / 10}px`,
                            height: `${particleR / 10}px`,
                            borderRadius: '50%',
                            background: colorPalette[(particle.color - 1) % colorPalette.length],
                            transform: `translate(${particle.x}%, ${particle.y}%)`,
                            opacity: 0.6,
                            animation: `particleFloat ${animationTime + particle.delay}ms ease-in-out infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Nav items */}
            {items.map((item, index) => (
                <a
                    key={item.label}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    href={item.href}
                    onClick={(e) => handleClick(index, e)}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '8px 20px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: activeIndex === index ? '#0A2647' : '#144272',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {item.label}
                </a>
            ))}

            <style jsx>{`
        @keyframes particleFloat {
          0%, 100% {
            transform: translate(var(--x), var(--y)) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(calc(var(--x) * 1.2), calc(var(--y) * 0.8)) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
        </nav>
    );
};

export default GooeyNav;
