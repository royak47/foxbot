import Navbar from './Navbar';

const Home = () => {
  const [remainingTime, setRemainingTime] = useState(6 * 60 * 60);
  const [isClaimed, setIsClaimed] = useState(false);
  const [foxBalance, setFoxBalance] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    if (remainingTime === 0 && !isClaimed) {
      setFoxBalance((prev) => prev + 10);
      setIsClaimed(true);
      setTimeout(() => {
        setRemainingTime(6 * 60 * 60);
        setIsClaimed(false);
      }, 1000);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((particle) => particle.id !== id));
  };

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <Image src="/tapFOX.png" alt="Tap FOX" fill className="object-contain" priority />
          </div>
          <div className="text-white text-2xl font-bold mb-4">
            {remainingTime > 0 ? `Next Claim In: ${formatTime(remainingTime)}` : 'Claim Now!'}
          </div>
          <button
            onClick={handleClaim}
            disabled={remainingTime > 0 || isClaimed}
            className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform ${
              remainingTime === 0 && !isClaimed
                ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            {isClaimed ? 'Claimed!' : 'Claim 10 FOX'}
          </button>
          <div className="mt-6 text-white text-lg font-medium">
            Your FOX Balance: {foxBalance} 🦊
          </div>
          {particles.map((particle) => (
            <TapFOX
              key={particle.id}
              position={{ x: particle.x, y: particle.y }}
              angle={particle.angle}
              onComplete={() => removeParticle(particle.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
