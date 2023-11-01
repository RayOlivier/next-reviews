import type { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import './globals.css';
import { orbitron, exo2 } from './fonts';
import { Metadata } from 'next';

// this sets default metadata
export const metadata: Metadata = {
  title: { default: 'Indie Gamer', template: '%s | Indie Gamer' },
  description: 'The best indie games, reviewed'
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="bg-orange-50 flex flex-col min-h-screen">
        <header>
          <NavBar />
        </header>

        <main className="grow py-3 px-4">{children}</main>
        <footer className="border-t py-3 text-center text-xs text-slate-500 bg-orange-100">
          Game data and images courtesy of{' '}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
          . Made by Ray Olivier.
        </footer>
      </body>
    </html>
  );
}
