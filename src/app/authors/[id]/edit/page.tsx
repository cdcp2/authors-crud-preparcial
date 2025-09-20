'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useAuthors } from '@/hooks/useAuthors';
import AuthorForm from '@/components/AuthorForm';

export default function EditAuthorPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { authors, loading, refresh } = useAuthors();

  const author = useMemo(() => authors.find(a => a.id === id), [authors, id]);

  // Si entran directo a /authors/[id]/edit sin haber cargado la lista, pedimos datos.
  useEffect(() => {
    if (!author) void refresh();
  }, [author, refresh]);

  if (Number.isNaN(id)) return <p>ID inválido.</p>;
  if (loading && !author) return <p>Cargando autor…</p>;
  if (!author) return <p>No se encontró el autor.</p>;

  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Editar autor</h1>
      <AuthorForm
        mode="edit"
        editId={id}
        initial={{
          name: author.name,
          birthDate: author.birthDate,
          image: author.image,
          description: author.description,
        }}
      />
    </>
  );
}
