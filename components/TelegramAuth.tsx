'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramAuthProps {
  botName: string;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
  usePic?: boolean;
  onAuth: (user: TelegramUser) => void;
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void;
    };
  }
}

const TelegramAuth = ({
  botName,
  buttonSize = 'large',
  cornerRadius = 10,
  requestAccess = true,
  usePic = true,
  onAuth,
}: TelegramAuthProps) => {
  const router = useRouter();

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', cornerRadius.toString());
    script.setAttribute('data-request-access', requestAccess.toString());
    script.setAttribute('data-userpic', usePic.toString());
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth');
    script.async = true;

    // Add script to document
    const container = document.getElementById('telegram-login');
    if (container) {
      container.innerHTML = ''; // Clear existing content
      container.appendChild(script);
    }

    // Define callback function
    window.TelegramLoginWidget = {
      dataOnauth: async (user: TelegramUser) => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/telegram/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

          if (!response.ok) {
            throw new Error('Authentication failed');
          }

          const data = await response.json();
          
          // Store the token and user info
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', user.username || user.first_name);
          localStorage.setItem('photoUrl', user.photo_url || '/userimage.png');
          
          onAuth(user);
          router.push('/home');
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, onAuth, router]);

  return (
    <div id="telegram-login" className="flex justify-center items-center min-h-[50px]" />
  );
};

export default TelegramAuth;
