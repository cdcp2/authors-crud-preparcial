'use client';

import AuthorList from '@/components/AuthorList';

export default function FavoritosPage() {
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Favoritos</h1>
      <AuthorList onlyFavorites />
    </>
  );
}
