import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Open_Sans, Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import Navigation from './componenets/navbar';
import Footer from './componenets/footer';
import { Toaster } from 'react-hot-toast';

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body className={Font.className}>
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <Providers>
          <div className="custom-navbar">
            <Navigation />
          </div>
          <main>{children}</main>
          <ScrollButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
