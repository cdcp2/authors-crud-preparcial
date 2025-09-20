import type { Metadata } from 'next';
import './globals.css';
import { AuthorsProvider } from '@/context/AuthorsContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Authors CRUD',
  description: 'Preparcial – CRUD con Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthorsProvider>
          <Navbar />
          <main style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>{children}</main>
        </AuthorsProvider>
      </body>
    </html>
  );
}
