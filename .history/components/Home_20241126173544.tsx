'use client';
import Link from 'next/link';
import Navbar from './Navbar';

const Home = () => {
  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <Link href="/play" className="w-full">
          <button className="w-full bg-purple-600 text-white rounded-lg py-3 px-6 hover:bg-purple-700 transition-colors">
            Play
          </button>
        </Link>
        <Link href="/invite" className="w-full">
          <button className="w-full bg-purple-600 text-white rounded-lg py-3 px-6 hover:bg-purple-700 transition-colors">
            Invite
          </button>
        </Link>
        <Link href="/leaderboard" className="w-full">
          <button className="w-full bg-purple-600 text-white rounded-lg py-3 px-6 hover:bg-purple-700 transition-colors">
            Leaderboard
          </button>
        </Link>
      </div>
      <Navbar />
    </main>
  );
};

export default Home;
