'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TapFOX from './TapFOX';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(6 * 60 * 60); // 6 hours in seconds
  const [isClaimed, setIsClaimed] = useState(false);
  const [username, setUsername] = useState<string>('username');
  const [photoUrl, setPhotoUrl] = useState<string>('/userimage.png');
  const [balance, setBalance] = useState(0);

  // Get user data from localStorage
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

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time (hh:mm:ss)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (timeLeft === 0 && !isClaimed) {
      setBalance((prev) => prev + 10); // Add 10 FOX
      setIsClaimed(true);
      setTimeLeft(6 * 60 * 60); // Reset timer for next claim
    }
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
      <Navbar />

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Profile and Balance */}
        <header className="absolute top-4 w-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20">
            <Image
              src="/tapFOX.png"
              alt="tapFOX"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white font-semibold">Tap Coin: {balance}</span>
          </div>

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
        </header>

        {/* FOX Token using TapFOX */}
        <div className="text-center">
          <TapFOX />

          {/* Countdown Timer */}
          <h1 className="text-4xl text-white font-bold mb-4">
            {timeLeft > 0 ? formatTime(timeLeft) : 'Ready to Claim!'}
          </h1>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            disabled={timeLeft > 0 || isClaimed}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              timeLeft > 0 || isClaimed
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#2081e2] hover:bg-[#1868b7] text-white'
            }`}
          >
            {isClaimed ? 'Claimed!' : 'Claim 10 FOX 🦊'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
