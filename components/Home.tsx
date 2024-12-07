'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Navbar from './Navbar';

const Home = () => {
  const [stats, setStats] = useState({ balance: 0 });
  const [miningActive, setMiningActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState('');
  const [miningProgress, setMiningProgress] = useState(0);
  const [minedTokens, setMinedTokens] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState<string>('username');
  const [photoUrl, setPhotoUrl] = useState<string>('/userimage.png');

  const MINING_DURATION = 6 * 60 * 60; // 6 hours in seconds
  const REWARD_AMOUNT = 10;

  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPhotoUrl = localStorage.getItem('photoUrl');

      if (storedUsername) setUsername(storedUsername);
      if (storedPhotoUrl) setPhotoUrl(storedPhotoUrl);

      fetchMiningData();
      restoreMiningState();
    } catch (err) {
      console.error('Error accessing localStorage:', err);
    }
  }, []);

  const fetchMiningData = async () => {
    try {
      const response = await axios.get(`/api/mining?username=${username}`);
      setStats({ balance: response.data.balance || 0 });
    } catch (error) {
      console.error('Error fetching mining data:', error);
    }
  };

  const restoreMiningState = () => {
    const miningStartTime = localStorage.getItem('miningStartTime');
    if (miningStartTime) {
      const elapsed = Math.floor(Date.now() / 1000) - parseInt(miningStartTime, 10);
      if (elapsed < MINING_DURATION) {
        setMiningActive(true);
        setTimeLeft(MINING_DURATION - elapsed);
        setMiningProgress((elapsed / MINING_DURATION) * 100);
      } else {
        localStorage.removeItem('miningStartTime');
      }
    }
  };

  const startMining = () => {
    if (miningActive) {
      setError('Mining is already active!');
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    localStorage.setItem('miningStartTime', currentTime.toString());

    setMiningActive(true);
    setTimeLeft(MINING_DURATION);
    setMiningProgress(0);
    setMinedTokens(0);
    setError('');
    setSuccessMessage('');
  };

  const claimReward = () => {
    if (timeLeft > 0 || minedTokens === 0) {
      setError('Mining is still in progress. Wait for it to complete!');
      return;
    }

    const newBalance = stats.balance + minedTokens;
    setStats({ balance: newBalance });
    updateMiningData(newBalance);
    setMinedTokens(0);
    setError('');
    setSuccessMessage(`${REWARD_AMOUNT} FOX tokens claimed and added to your balance!`);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden font-dot-matrix">
      <Navbar />

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

      <div className="relative z-10 min-h-screen pb-20">
        <header className="p-4 flex flex-col items-center">
          <Image
            src="/tapFOX.png"
            alt="FOX Logo"
            width={128}
            height={128}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-white">Start Mining Fox</h1>
        </header>

        <div className="flex flex-col items-center justify-center flex-1 p-8 min-h-[60vh] space-y-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-200 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <div className="relative w-64 h-64 rounded-full border-4 border-[#2081e2] flex items-center justify-center">
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full animate-spin-slow"
              style={{
                background: `conic-gradient(#2081e2 ${miningProgress}%, #1a1a1a ${miningProgress}%)`,
              }}
            ></div>
            <div className="absolute w-56 h-56 bg-[#0a0a0a] rounded-full flex flex-col items-center justify-center text-white">
              {miningActive ? (
                <>
                  <p className="text-2xl font-semibold">Time Left:</p>
                  <p className="text-xl font-bold">{formatTime(timeLeft)}</p>
                </>
              ) : (
                <p className="text-xl font-bold">Ready to Mine!</p>
              )}
              <p className="text-lg mt-2">Mined Tokens: {minedTokens}</p>
            </div>
          </div>

          <div className="flex justify-around w-full max-w-md space-x-4">
            <button
              onClick={startMining}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 ${
                miningActive
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              disabled={miningActive}
            >
              Start Mining
            </button>
            <button
              onClick={claimReward}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200"
              disabled={timeLeft > 0 || minedTokens === 0 || miningActive}
            >
              Claim Reward
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dot+Gothic+16&display=swap');

        .font-dot-matrix {
          font-family: 'Dot Gothic 16', sans-serif;
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
