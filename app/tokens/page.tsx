'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState } from 'react';

const TokensPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    // Add wallet connection logic here
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
        <header className="p-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center">Tokens</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Balances Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/tap-icon.png"
                  alt="Tap Balance"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <p className="text-white/60 text-sm">Tap Balance</p>
              </div>
              <p className="text-xl font-bold text-white">1,500</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/balance.png"
                  alt="Game Balance"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <p className="text-white/60 text-sm">Game Balance</p>
              </div>
              <p className="text-xl font-bold text-white">500</p>
            </div>
          </div>

          {/* Baby Liger Token Balance */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/babyliger_token.png"
                alt="Baby Liger Token"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div className="text-center">
                <p className="text-white/60 text-sm">BabyLiger Tokens</p>
                <h2 className="text-2xl font-bold text-white">250</h2>
              </div>
            </div>
          </div>

          {/* Conversion Buttons */}
          <div className="space-y-3">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl
                       shadow-[0_0_20px_rgba(147,51,234,0.3)] transform transition-all duration-300 
                       hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:scale-[1.02] active:scale-[0.98]
                       relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Convert Tap Balance to Game Balance</span>
            </button>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl
                       shadow-[0_0_20px_rgba(37,99,235,0.3)] transform transition-all duration-300 
                       hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]
                       relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Convert Game Balance to BabyLiger Tokens</span>
            </button>

            <button
              onClick={handleConnectWallet}
              className={`w-full font-semibold py-4 px-6 rounded-xl transform transition-all duration-300 
                       hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group
                       ${isWalletConnected 
                         ? 'bg-green-600 text-white' 
                         : 'bg-gradient-to-r from-pink-600 to-orange-600 text-white'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V12.1578L8.12132 9.27924C7.73079 8.88872 7.09763 8.88872 6.7071 9.27924C6.31658 9.66977 6.31658 10.3029 6.7071 10.6935L11.2929 15.2792C11.6834 15.6698 12.3166 15.6698 12.7071 15.2792L17.2929 10.6935C17.6834 10.3029 17.6834 9.66977 17.2929 9.27924C16.9024 8.88872 16.2692 8.88872 15.8787 9.27924L13 12.1578V5Z" fill="currentColor"/>
                  <path d="M4 14C4 13.4477 3.55228 13 3 13C2.44772 13 2 13.4477 2 14V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V14C22 13.4477 21.5523 13 21 13C20.4477 13 20 13.4477 20 14V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V14Z" fill="currentColor"/>
                </svg>
                {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </span>
            </button>
          </div>

          {/* Exchange Rates */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Exchange Rates</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-white/60">1000 Tap Balance</p>
                <p className="text-white">=</p>
                <p className="text-white">100 Game Balance</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white/60">1000 Game Balance</p>
                <p className="text-white">=</p>
                <p className="text-white">10 BabyLiger Tokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </main>
  );
};

export default TokensPage;
