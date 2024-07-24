import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { CrispProvider } from '@/components/crisp-provider';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <CrispProvider />
      <body className={`${inter.className} `}>
        <NextTopLoader />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
