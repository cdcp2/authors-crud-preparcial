'use client';

import Link from 'next/link';
import { useAuthors } from '@/hooks/useAuthors';

export default function Navbar() {
  const { favorites } = useAuthors();
  return (
    <nav
      aria-label="Navegación principal"
      style={{ padding: 12, borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 16 }}
    >
      <Link href="/authors">Autores</Link>
      <Link href="/crear">Crear autor</Link>
      <Link href="/favoritos" aria-label={`Favoritos, ${favorites.length} elementos`}>
        Favoritos ({favorites.length})
      </Link>
    </nav>
  );
}
