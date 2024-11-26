'use client';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from './Navbar';

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const handleTap = () => {
    setBalance(prev => prev + 1);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
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
        {/* Header */}
        <header className="p-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3">
            {/* Balance */}
            <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
              <span className="text-white font-semibold">Tap Balance: {balance}</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
              <span className="text-white font-medium">@username</span>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/userimage.png"
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
            <h1 className="text-2xl font-bold text-white text-center">Baby Liger</h1>
          </div>
        </header>

        {/* Token Tap Area */}
        <div className="flex flex-col items-center justify-center flex-1 p-8 min-h-[60vh]">
          <button
            onClick={handleTap}
            className={`relative transform transition-transform duration-100 ${
              isPressed ? 'scale-95' : 'scale-100 hover:scale-105'
            }`}
          >
            <div className="relative w-48 h-48">
              <Image
                src="/babyliger_token.png"
                alt="Baby Liger Token"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Tap Animation Ring */}
            <div className={`absolute inset-0 rounded-full ${
              isPressed ? 'animate-ping-once bg-white/20' : ''
            }`} />
          </button>
          <p className="text-white/60 text-sm mt-4">Tap to earn tokens!</p>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </main>
  );
};

export default Home;