'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
      <Link href="/authors" style={{ marginRight: 16 }}>Autores</Link>
      <Link href="/crear">Crear autor</Link>
    </nav>
  );
}
