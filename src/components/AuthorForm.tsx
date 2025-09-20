'use client';

import { useState, FormEvent } from 'react';
import { useAuthors } from '@/hooks/useAuthors';
import { useRouter } from 'next/navigation';
import type { NewAuthor } from '@/types/author';

type Props = {
  initial?: Partial<NewAuthor>;
  mode?: 'create' | 'edit';
  editId?: number; // ID a editar en modo 'edit'
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
    if (!name.trim()) { setError('El nombre es obligatorio.'); return; }

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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
      <label>
        <div>Nombre *</div>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required
          placeholder="J. R. R. Tolkien"
          style={{ width:'100%', padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
      </label>
      <label>
        <div>Fecha de nacimiento</div>
        <input type="date" value={birthDate} onChange={(e)=>setBirthDate(e.target.value)}
          style={{ width:'100%', padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
      </label>
      <label>
        <div>URL de imagen</div>
        <input type="url" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="https://…"
          style={{ width:'100%', padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
      </label>
      <label>
        <div>Descripción</div>
        <textarea rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Breve biografía…"
          style={{ width:'100%', padding:8, border:'1px solid #e5e7eb', borderRadius:8 }}
        />
      </label>

      {error && <p style={{ color:'crimson' }}>{error}</p>}

      <button type="submit" disabled={submitting}
        style={{ padding:'10px 14px', borderRadius:8, border:'1px solid #111827',
                 background: submitting ? '#9ca3af' : '#111827', color:'#fff',
                 cursor: submitting ? 'not-allowed' : 'pointer' }}>
        {submitting ? 'Guardando…' : mode === 'create' ? 'Crear autor' : 'Guardar cambios'}
      </button>
    </form>
  );
}
