'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState } from 'react';

// Sample player data
const weeklyPlayers = [
  { id: 1, username: '@player1', balance: 25000, avatar: '/userimage.png' },
  { id: 2, username: '@player2', balance: 18500, avatar: '/userimage.png' },
  { id: 3, username: '@player3', balance: 15700, avatar: '/userimage.png' },
  { id: 4, username: '@player4', balance: 12300, avatar: '/userimage.png' },
  { id: 5, username: '@player5', balance: 10200, avatar: '/userimage.png' },
  { id: 6, username: '@player6', balance: 8900, avatar: '/userimage.png' },
  { id: 7, username: '@player7', balance: 7500, avatar: '/userimage.png' },
  { id: 8, username: '@player8', balance: 6200, avatar: '/userimage.png' },
  { id: 9, username: '@player9', balance: 5100, avatar: '/userimage.png' },
  { id: 10, username: '@player10', balance: 4300, avatar: '/userimage.png' },
];

const monthlyPlayers = weeklyPlayers.map(player => ({
  ...player,
  balance: player.balance * 4,
}));

const allTimePlayers = weeklyPlayers.map(player => ({
  ...player,
  balance: player.balance * 10,
}));

type TimeFrame = 'weekly' | 'monthly' | 'all-time';

const LeaderboardPage = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('weekly');

  const getCurrentPlayers = () => {
    switch(timeFrame) {
      case 'weekly':
        return weeklyPlayers;
      case 'monthly':
        return monthlyPlayers;
      case 'all-time':
        return allTimePlayers;
    }
  };

  const players = getCurrentPlayers();

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
            <h1 className="text-2xl font-bold text-white text-center mb-4">Leaderboard</h1>
            <div className="flex justify-center gap-2">
              {(['weekly', 'monthly', 'all-time'] as TimeFrame[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFrame(tf)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    timeFrame === tf
                      ? 'bg-[#2081e2] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Top 3 Players */}
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={players[1].avatar}
                  alt={players[1].username}
                  fill
                  className="object-cover rounded-full border-2 border-[#C0C0C0]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C0C0C0] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  2
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-medium">{players[1].username}</p>
                <p className="text-[#C0C0C0] text-xs">{players[1].balance}</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-4">
              <div className="relative w-20 h-20 mb-2">
                <Image
                  src={players[0].avatar}
                  alt={players[0].username}
                  fill
                  className="object-cover rounded-full border-2 border-[#FFD700]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  1
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-medium">{players[0].username}</p>
                <p className="text-[#FFD700] text-xs">{players[0].balance}</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={players[2].avatar}
                  alt={players[2].username}
                  fill
                  className="object-cover rounded-full border-2 border-[#CD7F32]"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-sm font-medium">{players[2].username}</p>
                <p className="text-[#CD7F32] text-xs">{players[2].balance}</p>
              </div>
            </div>
          </div>

          {/* Rest of Players */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10" style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {players.slice(3).map((player, index) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-4 border-b border-white/10 last:border-b-0"
              >
                <div className="w-6 text-white/60 text-sm text-center">
                  {index + 4}
                </div>
                <div className="relative w-10 h-10">
                  <Image
                    src={player.avatar}
                    alt={player.username}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{player.username}</p>
                  <p className="text-white/60 text-xs">{player.balance} tokens</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </main>
  );
};

export default LeaderboardPage;
