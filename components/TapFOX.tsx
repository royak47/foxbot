'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TapFOXProps {
  position: { x: number; y: number };
  angle: number;
  onComplete: () => void;
}

const TapFOX = ({ position, angle, onComplete }: TapFOXProps) => {
  const [style, setStyle] = useState({
    x: 0,
    y: 0,
    scale: 0.5,
    opacity: 0,
    rotate: 0,
  });

  useEffect(() => {
    // Calculate distance and direction
    const distance = 100 + Math.random() * 50; // Random distance 100-150px
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    // Start animation
    requestAnimationFrame(() => {
      setStyle({
        x: targetX,
        y: targetY,
        scale: 1,
        opacity: 1,
        rotate: Math.random() * 720 - 360, // Random rotation between -360 and 360 degrees
      });
    });

    // Fade out
    const timer = setTimeout(() => {
      setStyle(prev => ({ ...prev, opacity: 0, scale: 0 }));
      setTimeout(onComplete, 100);
    }, 300);

    return () => clearTimeout(timer);
  }, [angle, onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) translate(${style.x}px, ${style.y}px) scale(${style.scale}) rotate(${style.rotate}deg)`,
        opacity: style.opacity,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="relative w-8 h-8">
        <Image
          src="/tapFOX.png"
          alt="Tap FOX"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default TapFOX;
