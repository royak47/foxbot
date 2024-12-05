'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Home = () => {
  const [remainingTime, setRemainingTime] = useState(6 * 60 * 60); // 6 hours in seconds
  const [isClaimed, setIsClaimed] = useState(false);
  const [foxBalance, setFoxBalance] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    if (remainingTime === 0 && !isClaimed) {
      setFoxBalance((prev) => prev + 10); // Add 10 FOX to balance
      setIsClaimed(true);
      setTimeout(() => {
        setRemainingTime(6 * 60 * 60); // Reset the timer for the next claim
        setIsClaimed(false);
      }, 1000); // Allow reset after claim animation
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <main className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="text-center">
        {/* FOX Image */}
        <div className="relative w-40 h-40 mx-auto mb-4">
          <Image
            src="/tapFOX.png"
            alt="Tap FOX"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Countdown Timer */}
        <div className="text-white text-2xl font-bold mb-4">
          {remainingTime > 0
            ? `Next Claim In: ${formatTime(remainingTime)}`
            : 'Claim Now!'}
        </div>

        {/* Claim Button */}
        <button
          onClick={handleClaim}
          disabled={remainingTime > 0 || isClaimed}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform ${
            remainingTime === 0 && !isClaimed
              ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          {isClaimed ? 'Claimed!' : 'Claim 10 FOX'}
        </button>

        {/* Balance Display */}
        <div className="mt-6 text-white text-lg font-medium">
          Your FOX Balance: {foxBalance} 🦊
        </div>

        {/* Particle Effects (TapFOX component) */}
        {particles.map((particle) => (
          <TapFOX
            key={particle.id}
            position={{ x: particle.x, y: particle.y }} // Correct position with x and y
            angle={particle.angle} // The angle for particle movement
            onComplete={() => removeParticle(particle.id)} // Callback to remove particle when animation completes
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
