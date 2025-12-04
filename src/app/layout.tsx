
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { AppInitializer } from '@/components/AppInitializer';
import { getSiteImages } from './actions';
import { VisitTracker } from '@/components/VisitTracker';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const images = await getSiteImages();
  const ogImageUrl = images.openGraphImage || 'https://i.imgur.com/39J0yD1.png';
  const faviconUrl = images.favicon || '';

  return {
    title: 'Southland College',
    description: 'Enlightening Minds, Molding Hearts. Join a tradition of excellence and become a beacon of success in a metamorphic world.',
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: 'Southland College',
      description: 'Enlightening Minds, Molding Hearts. Join a tradition of excellence and become a beacon of success in a metamorphic world.',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Southland College Campus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Southland College',
      description: 'Enlightening Minds, Molding Hearts. Join a tradition of excellence and become a beacon of success in a metamorphic world.',
      images: [ogImageUrl],
    },
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverImages = await getSiteImages();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn("font-sans antialiased flex flex-col min-h-screen bg-background text-foreground", inter.variable)}>
        <AppInitializer serverImages={serverImages} />
        <VisitTracker />
        <Script src="https://accounts.google.com/gsi/client" async defer></Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
