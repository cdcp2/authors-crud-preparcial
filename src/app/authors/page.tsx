'use client';
import AuthorList from '@/components/AuthorList';

export default function AuthorsPage() {
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Autores</h1>
      <AuthorList />
    </>
  );
}
