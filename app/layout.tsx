import type { Metadata } from 'next';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Providers from './providers';
import "@radix-ui/themes/styles.css";

import { Open_Sans, Playfair_Display } from 'next/font/google';
import Navigation from './componenets/navbar';
import Footer from './componenets/footer';
import { Toaster } from 'react-hot-toast';
import LocalizationProviderWrapper from '@/components/LocalizationProvider';
import ScrollButton from './componenets/scrollbutton';
const Font = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VidaBebidasProject ',
  description: 'Bartending Business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VB Admin" />
        <link rel="apple-touch-icon" href="/VB-Logo-2026.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <LocalizationProviderWrapper>
        <body className={Font.className}>
          <Toaster position="top-center" toastOptions={{ duration: 8000 }}   containerStyle={{
    top: '40%',  // ← This pushes it toward the middle
  }}/>
          <Providers>
            <div className="custom-navbar">
              <Navigation />
            </div>
            <main>{children}</main>
            <ScrollButton />
            <Footer />
          </Providers>
        </body>
      </LocalizationProviderWrapper>
    </html>
  );
}
