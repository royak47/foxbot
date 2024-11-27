'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import TapLiger from './TapLiger';

interface TapParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

const Home = () => {
  const [stats, setStats] = useState({
    balance: 0,
    dailyTaps: 0,
  });
  const [isPressed, setIsPressed] = useState(false);
  const [error, setError] = useState('');
  const [particles, setParticles] = useState<TapParticle[]>([]);
  const [username, setUsername] = useState<string>('username');
  const [photoUrl, setPhotoUrl] = useState<string>('/userimage.png');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const DAILY_TAP_LIMIT = 10;
  const TAP_REWARD = 50;
  const PARTICLE_COUNT = 12; // Increased number of particles for better burst effect

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/tap-sound.mp3');
    audioRef.current.volume = 0.3;
  }, []);

  // Get user data from localStorage after component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPhotoUrl = localStorage.getItem('photoUrl');
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedPhotoUrl) {
      setPhotoUrl(storedPhotoUrl);
    }
  }, []);

  // Reset taps at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const resetTaps = () => {
      setStats(prev => ({ ...prev, dailyTaps: 0 }));
      setError('');
    };

    const timer = setTimeout(resetTaps, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const createParticles = (centerX: number, centerY: number) => {
    const newParticles: TapParticle[] = [];
    const radius = 20; // Distance from center

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i * 2 * Math.PI) / PARTICLE_COUNT;
      newParticles.push({
        id: Date.now() + i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        angle: angle,
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
  };

  const removeParticle = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  const handleTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stats.dailyTaps >= DAILY_TAP_LIMIT) {
      setError('Daily tap limit reached! Come back tomorrow!');
      return;
    }

    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }

    // Create burst of particles
    const x = e.clientX;
    const y = e.clientY;

    // Clear existing particles
    setParticles([]);

    // Create new particles in a circle
    const angleStep = (2 * Math.PI) / PARTICLE_COUNT;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = i * angleStep;
      setParticles(prev => [...prev, {
        id: Date.now() + i,
        x,
        y,
        angle,
      }]);
    }

    // Update balance and tap count
    setStats(prev => ({
      balance: prev.balance + TAP_REWARD,
      dailyTaps: prev.dailyTaps + 1,
    }));

    // Visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);

    // Clear any previous error
    setError('');
  };

  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/space.png"
          alt="Space Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20"> 
        {/* Header */}
        <header className="p-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3">
            {/* Stats Display */}
            <div className="flex flex-col bg-white/10 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20">
              <span className="text-white font-semibold">Balance: {stats.balance}</span>
              <span className="text-white/60 text-sm">Taps: {stats.dailyTaps}/{DAILY_TAP_LIMIT}</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
              <span className="text-white font-medium">@{username}</span>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={photoUrl}
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Title Bar */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center">Baby Liger</h1>
          </div>
        </header>

        {/* Token Tap Area */}
        <div className="flex flex-col items-center justify-center flex-1 p-8 min-h-[60vh]">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Tap Button */}
          <button
            ref={buttonRef}
            onClick={handleTap}
            disabled={stats.dailyTaps >= DAILY_TAP_LIMIT}
            className={`relative transform transition-all duration-200 ${
              isPressed ? 'scale-95' : 'scale-100 hover:scale-105'
            } ${stats.dailyTaps >= DAILY_TAP_LIMIT ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="relative w-48 h-48">
              <Image
                src="/babyliger_token.png"
                alt="Baby Liger Token"
                fill
                className={`object-contain transition-transform duration-200 ${
                  isPressed ? 'scale-95' : 'scale-100'
                }`}
                priority
              />
            </div>

            {/* Tap Animation Ring */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-200 ${
              isPressed ? 'animate-ping-once bg-purple-500/20' : 'opacity-0'
            }`} />

            {/* Reward Animation */}
            {isPressed && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-400 font-bold text-xl animate-reward-popup">
                +{TAP_REWARD}
              </div>
            )}
          </button>

          {/* Particle Effects */}
          {particles.map(particle => (
            <TapLiger
              key={particle.id}
              position={{ x: particle.x, y: particle.y }}
              angle={particle.angle}
              onComplete={() => removeParticle(particle.id)}
            />
          ))}

          {/* Tap Status */}
          <p className="text-white/60 text-sm mt-4">
            {stats.dailyTaps >= DAILY_TAP_LIMIT 
              ? 'Daily limit reached! Come back tomorrow!'
              : `Tap to earn ${TAP_REWARD} tokens! (${DAILY_TAP_LIMIT - stats.dailyTaps} taps remaining)`
            }
          </p>

          {/* Daily Progress */}
          <div className="mt-6 w-full max-w-xs">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${(stats.dailyTaps / DAILY_TAP_LIMIT) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </main>
  );
};

export default Home;