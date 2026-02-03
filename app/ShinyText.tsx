"use client";

import { useRef, useEffect, useState } from 'react';

interface ShinyTextProps {
    text: string;
    speed?: number;
    delay?: number;
    color?: string;
    shineColor?: string;
    spread?: number;
    direction?: 'left' | 'right';
    yoyo?: boolean;
    pauseOnHover?: boolean;
    disabled?: boolean;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    speed = 2,
    delay = 0,
    color = '#b5b5b5',
    shineColor = '#ffffff',
    spread = 120,
    direction = 'left',
    yoyo = false,
    pauseOnHover = false,
    disabled = false,
    className = ''
}) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (disabled || !textRef.current) return;

        const element = textRef.current;
        let animationFrame: number;
        let startTime: number | null = null;
        let position = direction === 'left' ? -spread : spread;
        let movingForward = true;

        const animate = (timestamp: number) => {
            if (isPaused) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < delay * 1000) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            const delta = speed * 0.5;

            if (yoyo) {
                if (movingForward) {
                    position += delta;
                    if (position >= spread) {
                        movingForward = false;
                    }
                } else {
                    position -= delta;
                    if (position <= -spread) {
                        movingForward = true;
                    }
                }
            } else {
                if (direction === 'left') {
                    position += delta;
                    if (position > spread) {
                        position = -spread;
                    }
                } else {
                    position -= delta;
                    if (position < -spread) {
                        position = spread;
                    }
                }
            }

            element.style.background = `linear-gradient(
        90deg,
        ${color} 0%,
        ${color} ${50 + position - 20}%,
        ${shineColor} ${50 + position}%,
        ${color} ${50 + position + 20}%,
        ${color} 100%
      )`;
            element.style.backgroundClip = 'text';
            element.style.webkitBackgroundClip = 'text';
            element.style.color = 'transparent';

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [disabled, speed, delay, color, shineColor, spread, direction, yoyo, isPaused]);

    const handleMouseEnter = () => {
        if (pauseOnHover) setIsPaused(true);
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) setIsPaused(false);
    };

    if (disabled) {
        return <span className={className} style={{ color }}>{text}</span>;
    }

    return (
        <span
            ref={textRef}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'inline-block',
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
            }}
        >
            {text}
        </span>
    );
};

export default ShinyText;
