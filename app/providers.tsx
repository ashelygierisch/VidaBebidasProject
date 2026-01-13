'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PostHogProvider } from './lib/posthog'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light', 'dark', 'mytheme']}
      >
        <PostHogProvider>

        {children}
        </PostHogProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
