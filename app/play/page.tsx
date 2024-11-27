'use client';
import Navbar from '@/components/Navbar';
import TicTacToe from '@/components/TicTacToe';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const PlayPage = () => {
  const [babyligerBalance, setBabyligerBalance] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const DAILY_GAME_LIMIT = 15;
  const WIN_REWARD = 20;

  // Reset games at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const resetGames = () => {
      setGamesPlayed(0);
    };

    const timer = setTimeout(resetGames, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const handleGameComplete = (didWin: boolean) => {
    if (didWin) {
      setBabyligerBalance(prev => prev + WIN_REWARD);
    }
    setGamesPlayed(prev => prev + 1);
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
        {/* Top Bar with Balance and Games */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center bg-gradient-to-br from-white/10 via-purple-500/5 to-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20
                      hover:border-purple-500/30 transition-all duration-500">
            <span className="text-white font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              BabyLiger: {babyligerBalance}
            </span>
          </div>
          <div className="flex items-center bg-gradient-to-br from-white/10 via-purple-500/5 to-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
            <span className="text-white/60 text-sm">
              Games: {gamesPlayed}/{DAILY_GAME_LIMIT}
            </span>
          </div>
        </div>

        {/* Centered Play Button */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <button
            onClick={() => setIsGameOpen(true)}
            disabled={gamesPlayed >= DAILY_GAME_LIMIT}
            className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-6 px-12 rounded-2xl 
                     shadow-[0_0_15px_rgba(168,85,247,0.5)] transform transition-all duration-300 
                     hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] active:scale-[0.98]
                     relative overflow-hidden group
                     ${gamesPlayed >= DAILY_GAME_LIMIT ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative text-xl flex items-center gap-2">
              <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
              </svg>
              {gamesPlayed >= DAILY_GAME_LIMIT ? 'Daily Limit Reached' : 'Play Tic Tac Toe'}
            </span>
          </button>
        </div>
      </div>

      {/* Game Modal */}
      <TicTacToe
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onGameComplete={handleGameComplete}
        gamesLeft={DAILY_GAME_LIMIT - gamesPlayed}
      />

      {/* Navigation Bar */}
      <div className={`${isGameOpen ? 'pointer-events-none' : ''}`}>
        <Navbar />
      </div>
    </main>
  );
};

export default PlayPage;
