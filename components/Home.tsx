'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import TapFOX from './TapFOX';

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
  const [showContestPopup, setShowContestPopup] = useState(false);
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
    <main className="relative w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
      <Navbar   />
      
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
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20">
              <Image
                src="/tapliger.png"
                alt="tapliger"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-white font-semibold">Tap Coin: {stats.balance}</span>
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
            <h1 className="text-2xl font-bold text-white text-center">FOX</h1>
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

          
      {/* Contest Button */}
      <div className="absolute left-4 bottom-20 z-10">
        <button
          onClick={() => setShowContestPopup(true)}
          className="px-6 py-2.5 bg-[#2081e2] hover:bg-[#1868b7] text-white rounded-lg transition-colors duration-200 font-semibold shadow-lg flex items-center justify-center space-x-2"
        >
          <span>🏆</span>
          <span>Contest</span>
        </button>
      </div>

      {/* Contest Popup */}
      {showContestPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" 
          onClick={() => setShowContestPopup(false)}
        >
          <div 
            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl relative w-[90%] max-w-md transform scale-100 animate-scaleIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute -top-4 -right-4">
              <button
                onClick={() => setShowContestPopup(false)}
                className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <span className="text-5xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#2081e2] to-[#1868b7] bg-clip-text text-transparent">
                Contest
              </h2>
              <div className="relative">
                <p className="text-xl text-gray-700 font-medium mb-4">Coming Soon!</p>
                <p className="text-gray-500 text-sm">
                  Get ready for exciting competitions and amazing prizes!
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>🎮</span>
                  <span>Stay tuned for updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default Home;
