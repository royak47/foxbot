import Home from '@/components/Home';

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen max-w-md mx-auto bg-gradient-to-b from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E]">
      <div className="relative z-10 min-h-screen pb-20">
        <Home />
      </div>
    </main>
  );
}
