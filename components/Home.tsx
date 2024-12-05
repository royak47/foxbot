'use client';

import TapFOX from './TapFOX';
import { useState, useEffect } from 'react';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(21600); // 6 hours in seconds
  const [canClaim, setCanClaim] = useState(false);
  const FOX_REWARD = 10;

  // Countdown Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanClaim(true);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    if (canClaim) {
      alert(`You claimed ${FOX_REWARD} FOX! 🦊`);
      setTimeLeft(21600); // Reset timer to 6 hours
      setCanClaim(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center text-center text-white">
      {/* FOX Token Display */}
      <TapFOX />

      {/* Countdown Timer */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold">Next Claim</h1>
        <p className="text-lg mt-2">{formatTime(timeLeft)}</p>
      </div>

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={!canClaim}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white ${
          canClaim ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'
        }`}
      >
        {canClaim ? `Claim ${FOX_REWARD} FOX 🦊` : 'Claim Disabled'}
      </button>
    </main>
  );
};

export default Home;
