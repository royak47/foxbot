'use client';
import Navbar from '@/components/Navbar';
import TicTacToe from '@/components/TicTacToe';
import { useState } from 'react';

const PlayPage = () => {
  const [gameBalance, setGameBalance] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleGameComplete = (didWin: boolean) => {
    if (didWin) {
      setGameBalance(prev => prev + 100);
    }
  };

  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto bg-gradient-to-br from-[#1a0b2e] via-[#2b1245] to-[#1a0b2e] animate-gradient-xy">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none"></div>
      <div className="relative z-10 min-h-screen pb-20">
        {/* Top Bar with Balance */}
        <div className="p-4">
          <div className="flex items-center bg-gradient-to-br from-white/10 via-purple-500/5 to-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 w-fit
                        hover:border-purple-500/30 transition-all duration-500">
            <span className="text-white font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Game Balance: {gameBalance}
            </span>
          </div>
        </div>

        {/* Centered Play Button */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <button
            onClick={() => setIsGameOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-6 px-12 rounded-2xl 
                     shadow-[0_0_15px_rgba(168,85,247,0.5)] transform transition-all duration-300 
                     hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] active:scale-[0.98]
                     relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative text-xl flex items-center gap-2">
              <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
              </svg>
              Play Tic Tac Toe
            </span>
          </button>
        </div>
      </div>

      {/* Game Modal */}
      <TicTacToe
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onGameComplete={handleGameComplete}
      />

      {/* Navigation Bar */}
      <div className={`${isGameOpen ? 'pointer-events-none' : ''}`}>
        <Navbar />
      </div>
    </main>
  );
};

export default PlayPage;
