'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TelegramAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Initialize Telegram login widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'kitkaatbot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', 'http://localhost:5000/api/auth/telegram/callback');
    
    // Remove any existing script to prevent duplicates
    const existingScript = document.getElementById('telegram-login-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    script.id = 'telegram-login-script';
    const container = document.getElementById('telegram-login');
    if (container) {
      container.innerHTML = ''; // Clear existing content
      container.appendChild(script);
    }

    // Define the callback function
    window.onTelegramAuth = async (telegramUser: any) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/telegram/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(telegramUser),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        
        // Store the token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('photoUrl', data.user.photoUrl || '/userimage.png');
        
        router.push('/home');
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return () => {
      // Cleanup
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [router]);

  return (
    <div id="telegram-login" className="flex justify-center items-center min-h-[50px]" />
  );
};

// Add TypeScript interface for the window object
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

export default TelegramAuth;
