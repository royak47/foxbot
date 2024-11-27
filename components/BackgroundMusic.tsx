'use client';
import { useEffect, useState } from 'react';

const BackgroundMusic = () => {
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/Beloved.mp3') : null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.pause();
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [audio]);

  const toggleMusic = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.log('Playback failed:', error);
      });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-[100] bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title={isPlaying ? 'Pause Music' : 'Play Music'}
    >
      {isPlaying ? (
        // Pause Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      ) : (
        // Play Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
    </button>
  );
};

export default BackgroundMusic;
