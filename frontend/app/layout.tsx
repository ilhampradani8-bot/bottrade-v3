import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BitTrade V3 - Web3 Paper White Trading Platform',
  description: 'Decoupled Web3 Next.js Paper White Dashboard & AssemblyScript Wasm Engine Core',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1B1A]">
        {children}
      </body>
    </html>
  );
}
