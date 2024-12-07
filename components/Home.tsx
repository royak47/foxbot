
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Navbar from './Navbar';

const Home = () => {
  const [stats, setStats] = useState({ balance: 0 });
  const [miningActive, setMiningActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [error, setError] = useState('');
  const [miningProgress, setMiningProgress] = useState(0); // Progress in percentage
  const [minedTokens, setMinedTokens] = useState(0); // Count mined tokens
  const [username, setUsername] = useState<string>('username');
  const [photoUrl, setPhotoUrl] = useState<string>('/userimage.png');

  const MINING_DURATION = 6 * 60 * 60; // 6 hours in seconds
  const REWARD_AMOUNT = 10;
  const [initialTimeLeft, setInitialTimeLeft] = useState(MINING_DURATION); // Initial time for progress calculation

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPhotoUrl = localStorage.getItem('photoUrl');

    if (storedUsername) setUsername(storedUsername);
    if (storedPhotoUrl) setPhotoUrl(storedPhotoUrl);

    // Fetch mining balance from MongoDB
    fetchMiningData();
  }, []);

  // Fetch mining data from the database
  const fetchMiningData = async () => {
    try {
      const response = await axios.get(`/api/mining?username=${username}`);
      setStats({ balance: response.data.balance || 0 });
    } catch (error) {
      console.error('Error fetching mining data:', error);
    }
  };

  // Update mining data in the database
  const updateMiningData = async (newBalance: number) => {
    try {
      await axios.post('/api/mining', { username, balance: newBalance });
    } catch (error) {
      console.error('Error updating mining data:', error);
    }
  };

  // Mining timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (miningActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setMiningProgress(((initialTimeLeft - timeLeft) / initialTimeLeft) * 100);
      }, 1000);
    } else if (timeLeft === 0 && miningActive) {
      setMiningActive(false);
      setMiningProgress(100);
      setMinedTokens(REWARD_AMOUNT);
    }

    return () => clearInterval(timer);
  }, [miningActive, timeLeft, initialTimeLeft]);

  const startMining = () => {
    if (miningActive) {
      setError('Mining is already active!');
      return;
    }

    setMiningActive(true);
    setTimeLeft(MINING_DURATION);
    setInitialTimeLeft(MINING_DURATION); // Reset the initial time for progress calculation
    setMiningProgress(0);
    setMinedTokens(0);
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

    const newBalance = stats.balance + minedTokens;
    setStats({ balance: newBalance });
    updateMiningData(newBalance); // Update the mining data in the backend (MongoDB)
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
        <header className="p-4 flex flex-col items-center">
          <Image
            src="/FOX.png"
            alt="FOX Logo"
            width={128}
            height={128}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-white">Start Mining FOX</h1>
        </header>

        <div className="flex flex-col items-center justify-center flex-1 p-8 min-h-[60vh] space-y-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Mining Section */}
          <div className="relative w-72 h-72 rounded-full border-4 border-[#2081e2] flex items-center justify-center">
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full animate-spin-slow"
              style={{
                background: `conic-gradient(#2081e2 ${miningProgress}%, #1a1a1a ${miningProgress}%)`,
              }}
            ></div>
            <div className="absolute w-64 h-64 bg-[#0a0a0a] rounded-full flex flex-col items-center justify-center text-white">
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
              disabled={timeLeft > 0 || minedTokens === 0}
            >
              Claim Reward
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
