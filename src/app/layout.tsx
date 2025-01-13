import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import EntryPointWrapper from '@/components/EntryPointWrapper';
import { GlobalStoreProvider } from '@/components/GlobalStoreProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ABCmovies',
  description:
    'Get to know any details on any movie | Browse the biggest movie database online!',
  generator: 'Next.js',
  applicationName: 'ABCmovies',
  creator: 'Daniel Ramirez',
  authors: { name: 'Daniel Ramirez', url: 'https://ramzeis.com' },
  keywords: ['movies', 'entertainment', 'films'],
  openGraph: {
    title: 'ABCmovies',
    type: 'website',
    url: process.env.NEXT_PUBLIC_FRONTEND_URL!,
    description: 'Browse the biggest movie database online!',
    siteName: 'ABCmovies',
    images: [
      {
        url: `${process.env
          .NEXT_PUBLIC_IMAGES_URL!}/w500/k24eZq5I3jyz4htPkZCRpnUmBzE.jpg`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `${process.env
          .NEXT_PUBLIC_IMAGES_URL!}/w500/k24eZq5I3jyz4htPkZCRpnUmBzE.jpg`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full flex flex-col justify-center items-center`}
      >
        <GlobalStoreProvider>
          <EntryPointWrapper>
            <header className='w-full flex flex-col justify-center items-center'>
              <Nav />
              <div className='min-h-[45vh] w-full'>
                <Hero />
              </div>
            </header>
            <main className='w-full flex md:flex-row flex-col justify-start items-stretch bg-base-100'>
              <div className='md:w-[250px] w-full bg-base-200 p-4'>
                <SearchBar placeholder='Search' />
              </div>
              <div className='flex-1 px-8 py-4 flex flex-col gap-8 overflow-x-hidden'>
                {children}
              </div>
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </EntryPointWrapper>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
