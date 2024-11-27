'use client';
import { FC } from 'react';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicControl: FC<MusicControlProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-xl p-3 rounded-full border border-white/20 
                hover:bg-white/20 transition-all duration-300 group"
      aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      {isPlaying ? (
        <svg
          className="w-6 h-6 text-white/60 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-white/60 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default MusicControl;
