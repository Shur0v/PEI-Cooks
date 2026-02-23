import type {Metadata} from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { PrototypeNavigator } from '@/components/prototype-navigator';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
  title: 'PEI Cooks | Community Cookbook & Events',
  description: 'Warm, island-authentic community cookbook, events, and vendor directory for Prince Edward Island.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        {children}
        <PrototypeNavigator />
      </body>
    </html>
  );
}
