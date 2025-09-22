'use client';

import { useState, FormEvent } from 'react';
import { useAuthors } from '@/hooks/useAuthors';
import { useRouter } from 'next/navigation';
import type { NewAuthor } from '@/types/author';

type Props = {
  initial?: Partial<NewAuthor>;
  mode?: 'create' | 'edit';
  editId?: number;
  onSubmitSuccess?: () => void;
};

export default function AuthorForm({ initial = {}, mode = 'create', editId, onSubmitSuccess }: Props) {
  const [name, setName] = useState(initial.name ?? '');
  const [birthDate, setBirthDate] = useState(initial.birthDate ?? '');
  const [image, setImage] = useState(initial.image ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { create, update: updateAuthor } = useAuthors();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    try {
      setSubmitting(true);
      if (mode === 'create') {
        await create({ name, birthDate, image, description });
      } else {
        if (!editId) { setError('Falta el ID para editar'); return; }
        await updateAuthor(editId, { name, birthDate, image, description });
      }
      onSubmitSuccess?.();
      router.push('/authors');
    } catch (err: any) {
      setError(err?.message ?? 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  const nameError = !name.trim() && error !== null;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560 }} aria-labelledby="form-title">
      <h2 id="form-title" style={{ position: 'absolute', left: -10000, top: 'auto' }}>
        {mode === 'create' ? 'Formulario para crear autor' : 'Formulario para editar autor'}
      </h2>

      <label htmlFor="name">Nombre *</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        aria-invalid={nameError}
        aria-describedby={nameError ? 'name-error' : undefined}
        placeholder="J. R. R. Tolkien"
        style={{ width: '100%', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}
      />
      {nameError && (
        <p id="name-error" role="alert" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      <label htmlFor="birthDate">Fecha de nacimiento</label>
      <input
        id="birthDate"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        style={{ width: '100%', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}
      />

      <label htmlFor="image">URL de imagen</label>
      <input
        id="image"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://…"
        style={{ width: '100%', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}
      />

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Breve biografía…"
        style={{ width: '100%', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8 }}
      />

      {error && !nameError && (
        <p role="alert" style={{ color: 'crimson' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        aria-label={mode === 'create' ? 'Crear autor' : 'Guardar cambios'}
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid #111827',
          background: submitting ? '#9ca3af' : '#111827',
          color: 'white',
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Guardando…' : mode === 'create' ? 'Crear autor' : 'Guardar cambios'}
      </button>
    </form>
  );
}
