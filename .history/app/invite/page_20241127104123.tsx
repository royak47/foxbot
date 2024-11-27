'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const InvitePage = () => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/babyliger', '_blank');
  };

  const handleTwitterJoin = () => {
    window.open('https://x.com/babyliger_blg', '_blank');
  };

  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto bg-gradient-to-b from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]">
      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20">
        <header className="p-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center">Join Community</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Rewards Info */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white text-center mb-2">Earn Tokens</h2>
            <p className="text-white/60 text-center text-sm mb-4">
              Join our communities and earn tokens as rewards!
            </p>
            <div className="flex justify-center items-center gap-2 bg-[#FFD700]/20 rounded-lg p-3">
              <Image
                src="/babyliger_token.png"
                alt="Token"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-[#FFD700] font-semibold">
                500 tokens per community join
              </span>
            </div>
          </div>

          {/* Community Buttons */}
          <div className="space-y-4">
            {/* Telegram */}
            <button
              onClick={handleTelegramJoin}
              className="w-full bg-[#0088CC] hover:bg-[#0077B5] text-white rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Image
                  src="https://telegram.org/img/t_logo.svg"
                  alt="Telegram"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Join Telegram</h3>
                <p className="text-white/80 text-sm">Join our active Telegram community</p>
              </div>
            </button>

            {/* Twitter */}
            <button
              onClick={handleTwitterJoin}
              className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Follow on Twitter</h3>
                <p className="text-white/80 text-sm">Follow us for latest updates</p>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">How it works</h3>
                <p className="text-white/60 text-sm">
                  1. Click on the community you want to join<br />
                  2. Follow/Join the community<br />
                  3. Return to the app<br />
                  4. Tokens will be credited within 24 hours
                </p>
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

export default InvitePage;
