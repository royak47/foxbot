import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/home');
  };

  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto">
      {/* Background Image */}
      <div className="fixed inset-0 max-w-md mx-auto">
        <Image
          src="/babyliger.png"
          alt="Baby Liger Background"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 384px"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex items-center px-6">
        <div className="w-full">
          <div className="w-full px-6 py-8 bg-black/30 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Baby Liger</h1>
              <p className="text-gray-300 text-sm">Welcome to the future of gaming</p>
            </div>

            {/* Sign In Button */}
            <div className="space-y-4">
              <button
                onClick={handleSignIn}
                className="w-full py-3 px-4 bg-[#0088CC] hover:bg-[#0077B5] text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Image
                  src="https://telegram.org/img/t_logo.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
                Continue with Telegram
              </button>

              {/* Additional Features */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  By continuing, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
