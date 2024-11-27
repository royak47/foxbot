'use client';
import { useEffect, useRef, useState } from "react";
import MusicControl from "@/components/MusicControl";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/Beloved.mp3');
    if (audioRef.current) {
      audioRef.current.loop = true; // Make the music loop
      audioRef.current.volume = 0.5; // Set volume to 50%
      
      // Play audio when user interacts with the page
      const playAudio = () => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => console.log("Audio playback failed:", error));
          // Remove event listeners after first interaction
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchstart', playAudio);
        }
      };

      // Add event listeners for user interaction
      document.addEventListener('click', playAudio);
      document.addEventListener('touchstart', playAudio);
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.log("Audio playback failed:", error));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      {children}
      <MusicControl isPlaying={isPlaying} onToggle={toggleMusic} />
    </>
  );
}
