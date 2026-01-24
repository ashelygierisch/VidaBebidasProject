'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PostHogProvider } from './lib/posthog'
import { Theme } from "@radix-ui/themes";
export default function Providers({ children }: { children: React.ReactNode }) {
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
