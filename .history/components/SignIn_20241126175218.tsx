'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/home');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 relative bg-gray-100">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative bg-gradient-to-br from-gray-100/10 via-white/10 to-gray-100/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Image
              src="/babyliger_token.png"
              alt="Baby Liger Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text 
                       bg-[length:200%_auto] animate-shine mb-3">
            Baby Liger
          </h1>
          <p className="text-white/60 text-lg">Welcome to the future of gaming</p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl
                   shadow-[0_0_20px_rgba(168,85,247,0.4)] transform transition-all duration-300 
                   hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98]
                   relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-3 text-lg font-medium">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 11L22 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Connect with Telegram
          </span>
        </button>

        {/* Additional Info */}
        <p className="text-white/40 text-sm text-center mt-6">
          By connecting, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default SignIn;
