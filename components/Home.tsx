'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';

const Home = () => {
  const [stats, setStats] = useState({
    balance: 0,
  });
  const [miningActive, setMiningActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [error, setError] = useState('');
  const [username, setUsername] = useState<string>('username');
  const [photoUrl, setPhotoUrl] = useState<string>('/userimage.png');

  const MINING_DURATION = 6 * 60 * 60; // 6 hours in seconds
  const REWARD_AMOUNT = 10;

  // Get user data from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPhotoUrl = localStorage.getItem('photoUrl');

    if (storedUsername) setUsername(storedUsername);
    if (storedPhotoUrl) setPhotoUrl(storedPhotoUrl);
  }, []);

  // Mining timer logic
  useEffect(() => {
    if (miningActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && miningActive) {
      setMiningActive(false); // Stop mining automatically when time is up
    }
  }, [miningActive, timeLeft]);

  const startMining = () => {
    if (miningActive) {
      setError('Mining is already active!');
      return;
    }

    setMiningActive(true);
    setTimeLeft(MINING_DURATION);
    setError('');
  };

  const claimReward = () => {
    if (timeLeft > 0) {
      setError('Mining is still in progress. Wait for it to complete!');
      return;
    }

    if (!miningActive) {
      setError('You need to start mining first!');
      return;
    }

    setStats(prev => ({
      balance: prev.balance + REWARD_AMOUNT,
    }));
    setMiningActive(false);
    setError('');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs}s`;
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
      <div className="relative z-10 min-h-screen pb-20">
        <header className="p-4">
          <div className="flex items-center justify-between mb-3">
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
        </header>

        <div className="flex flex-col items-center justify-center flex-1 p-8 min-h-[60vh]">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Start Mining FOX</h1>
            <p className="text-lg text-gray-300">
              {miningActive
                ? `Time Left: ${formatTime(timeLeft)}`
                : 'Click "Start Mining" to begin earning tokens!'}
            </p>
            <div className="space-x-4">
              <button
                onClick={startMining}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors duration-200"
                disabled={miningActive}
              >
                Start Mining
              </button>
              <button
                onClick={claimReward}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200"
                disabled={timeLeft > 0}
              >
                Claim Reward
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
