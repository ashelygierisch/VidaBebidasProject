'use client';
import OneSignal from 'react-onesignal';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PostHogProvider } from './lib/posthog'
import { Theme } from "@radix-ui/themes";
import { useEffect, useRef } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const initializedRef = useRef(false);
  
  useEffect(() => {
    // Only initialize OneSignal once
    if (initializedRef.current) return;
    
    // Check if we're on the admin dashboard
    // Note: This only works on initial page load. If user navigates to admin dashboard
    // from another page, the button won't appear (OneSignal limitation).
    const isAdminDashboard = typeof window !== 'undefined' && 
      window.location.pathname.startsWith('/admin/dashboard');
    
    // Initialize OneSignal - only enable notifyButton on admin dashboard
    OneSignal.init({
      appId: "53d2b6e8-bc6e-480e-8a78-f3a993a3d92a",
      safari_web_id: "web.onesignal.auto.32a023df-3e37-4c19-843f-3978a63a946e",
      notifyButton: {
        enable: isAdminDashboard, // Only enable on admin dashboard
        prenotify: false,
        showCredit: false,
        text: {
          'tip.state.unsubscribed': 'Subscribe to notifications',
          'tip.state.subscribed': 'You\'re subscribed to notifications',
          'tip.state.blocked': 'You\'ve blocked notifications',
          'message.prenotify': 'Click to subscribe to notifications',
          'message.action.subscribing': 'Subscribing...',
          'message.action.subscribed': 'Thanks for subscribing!',
          'message.action.resubscribed': 'You\'re subscribed to notifications',
          'message.action.unsubscribed': 'You won\'t receive notifications again',
          'dialog.main.title': 'Manage Site Notifications',
          'dialog.main.button.subscribe': 'SUBSCRIBE',
          'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
          'dialog.blocked.title': 'Unblock Notifications',
          'dialog.blocked.message': 'Follow these instructions to allow notifications:'
        },
      },
    }).catch(err => console.error('OneSignal init error:', err));
    
    initializedRef.current = true;
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
