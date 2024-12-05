declare module 'react-telegram-login' {
  import { ReactNode } from 'react';

  interface TelegramLoginButtonProps {
    botName: string;
    dataOnauth?: (user: any) => void;
    buttonSize?: 'large' | 'medium' | 'small';
    cornerRadius?: number;
    requestAccess?: string;
    usePic?: boolean;
    widgetVersion?: number;
    lang?: string;
  }

  declare const TelegramLoginButton: React.ComponentType<TelegramLoginButtonProps>;

  export default TelegramLoginButton;
}
