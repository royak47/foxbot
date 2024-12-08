'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const InvitePage = () => {
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    const userId = 'unique_user_id'; // Replace with dynamic user ID logic
    const link = `https://t.me/FOXOG_BOT/FOX?start=${userId}`;
    setReferralLink(link);

    fetchReferralCount(userId);
  }, []);

  const fetchReferralCount = async (userId) => {
    try {
      const response = await fetch(`/api/referrals?userId=${userId}`);
      const data = await response.json();
      setReferralCount(data.count || 0);
    } catch (error) {
      console.error('Error fetching referral count:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const handleShareOnTelegram = () => {
    const message = `Join FOXOG and earn rewards! Use my referral link: ${referralLink}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(
      message
    )}`;
    window.open(telegramUrl, '_blank');
  };

  const handleTelegramJoin = () => {
    window.open('https://t.me/FOXOGcommunity', '_blank');
  };

  const handleTwitterJoin = () => {
    window.open('https://x.com/FOXOG', '_blank');
  };

  const saveReferral = async (referrerId) => {
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referrerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save referral');
      }

      alert('Referral successfully added!');
    } catch (error) {
      console.error('Error saving referral:', error);
    }
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
            <h1 className="text-2xl font-bold text-white text-center">Join Community</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Invite Friends */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white text-center mb-4">Invite Friends</h2>
            <div className="flex gap-4">
              <button
                onClick={handleCopyLink}
                className="flex-1 bg-[#FFD700] text-black font-semibold rounded-lg py-2 px-4 text-center"
              >
                Copy Link
              </button>
              <button
                onClick={handleShareOnTelegram}
                className="flex-1 bg-[#0088CC] text-white font-semibold rounded-lg py-2 px-4 text-center"
              >
                Share on Telegram
              </button>
            </div>
            <p className="text-white/80 text-center mt-4">
              Total Referrals: <span className="text-white font-bold">{referralCount}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </main>
  );
};

export default InvitePage;
