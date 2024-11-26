'use client';
import Navbar from '@/components/Navbar';
import TicTacToe from '@/components/TicTacToe';
import Image from 'next/image';
import { useState } from 'react';

const PlayPage = () => {
  const [gameBalance, setGameBalance] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleGameComplete = (didWin: boolean) => {
    if (didWin) {
      setGameBalance(prev => prev + 100); // Award 100 tokens for winning
    }
  };

  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto bg-black">
      {/* Background Image */}
      <div className="fixed inset-0 max-w-md mx-auto">
        <Image
          src="/babyliger.png"
          alt="Baby Liger Background"
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 768px) 100vw, 384px"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20">
        {/* Top Bar with Balance */}
        <div className="p-4">
          <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 w-fit">
            <span className="text-white font-semibold">Game Balance: {gameBalance}</span>
          </div>
        </div>

        {/* Centered Play Button */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <button
            onClick={() => setIsGameOpen(true)}
            className="bg-gradient-to-r from-[#0088CC] to-[#0077B5] text-white font-bold py-6 px-12 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative text-xl">Play Tic Tac Toe</span>
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
