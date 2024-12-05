'use client';
import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/Beloved.mp3');
    audio.loop = true;
    
    const playAudio = () => {
      audio.play().catch(error => {
        console.log('Auto-play failed:', error);
      });
    };

    // Try to play when component mounts
    playAudio();

    // Also try to play when user interacts with the page
    const handleInteraction = () => {
      playAudio();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      audio.pause();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return null;
};

export default BackgroundMusic;
