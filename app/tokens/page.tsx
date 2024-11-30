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
                  src="/babyliger_token.png"
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
                  src="/babyliger_token.png"
                  alt="BabyLiger Balance"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <p className="text-white/60 text-sm">BabyLiger</p>
              </div>
              <p className="text-xl font-bold text-white">250</p>
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
              <span className="relative">Convert Tap Balance to BabyLiger</span>
            </button>
          </div>

          {/* Wallet Connection */}
          {!isWalletConnected ? (
            <button
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-[#F8C8DC] to-[#FFD7E5] text-[#D14D72] font-bold py-4 px-6 rounded-xl
                       border-4 border-[#E6A4B4] shadow-lg transform transition-all duration-300 
                       hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                       relative overflow-hidden group mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <Image
                  src="/babyliger_token.png"
                  alt="BabyLiger Token"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                Connect Wallet
              </span>
            </button>
          ) : (
            <div className="bg-gradient-to-r from-[#F8C8DC] to-[#FFD7E5] rounded-xl p-4 border-4 border-[#E6A4B4] mt-6">
              <p className="text-[#D14D72] text-center font-bold">Wallet Connected ✓</p>
            </div>
          )}

          {/* Exchange Rates */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 mt-6">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Exchange Rates</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-white/60">1000 Tap Balance</p>
                <p className="text-white">=</p>
                <p className="text-white">10 BabyLiger Tokens</p>
              </div>
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

          {/* Navigation Bar */}
          <Navbar />
        </div>
      </div>
    </main>
  );
};

export default TokensPage;
