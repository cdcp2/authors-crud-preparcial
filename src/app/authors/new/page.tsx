'use client';
import AuthorForm from '@/components/AuthorForm';

export default function NewAuthorPage() {
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Crear autor</h1>
      <AuthorForm mode="create" />
    </>
  );
}
