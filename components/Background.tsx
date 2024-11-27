'use client';
import Image from 'next/image';

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 w-full h-full">
        <Image
          src="/space.png"
          alt="Space Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;
