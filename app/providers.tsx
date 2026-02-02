'use client';
import OneSignal from 'react-onesignal';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PostHogProvider } from './lib/posthog'
import { Theme } from "@radix-ui/themes";
import { useEffect } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    OneSignal.init({
      appId: "53d2b6e8-bc6e-480e-8a78-f3a993a3d92a",
      safari_web_id: "web.onesignal.auto.32a023df-3e37-4c19-843f-3978a63a946e",
      allowLocalhostAsSecureOrigin: true,
    }).catch(err => console.error('OneSignal init error:', err));
  }, []);
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light', 'dark', 'mytheme']}
      >
        <Theme>

        <PostHogProvider>

        {children}
        </PostHogProvider>
        </Theme>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
