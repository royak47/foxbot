'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', icon: '/home.png', path: '/home' },
  { name: 'Leaderboard', icon: '/leaderboard.png', path: '/leaderboard' },
  { name: 'Play', icon: '/balance.png', path: '/play' },
  { name: 'Tokens', icon: '/crypto.png', path: '/tokens' },
  { name: 'Invite', icon: '/invite.png', path: '/invite' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black/50 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex justify-around items-center px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 scale-110'
                  : 'hover:bg-white/5 active:scale-95'
              }`}
            >
              <div className="relative w-6 h-6 mb-1">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-white/80">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;