'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

const SignIn = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <Image
        src="/FOX.gif" // Ensure this file exists in your public folder
        alt="FOX Animation"
        width={400}
        height={400}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default SignIn;
