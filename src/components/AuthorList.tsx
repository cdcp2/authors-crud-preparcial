'use client';

import Link from 'next/link';
import { useAuthors } from '@/hooks/useAuthors';

export default function AuthorList() {
  const { authors, loading, error, remove } = useAuthors();

  const onDelete = async (id: number, name: string) => {
    const ok = confirm(`¿Eliminar al autor "${name}"?`);
    if (!ok) return;
    try {
      await remove(id);
    } catch (e: any) {
      alert(e?.message ?? 'No se pudo eliminar');
    }
  };

  if (loading) return <p>Cargando autores…</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (authors.length === 0) return <p>No hay autores aún.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nombre</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nacimiento</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Imagen</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Descripción</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((a) => (
          <tr key={a.id}>
            <td style={{ padding: 8, verticalAlign: 'top' }}>{a.name}</td>
            <td style={{ padding: 8, verticalAlign: 'top' }}>{a.birthDate}</td>
            <td style={{ padding: 8, verticalAlign: 'top' }}>
              <img
                src={a.image || '/next.svg'}
                alt={a.name}
                width={64}
                height={64}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = '/next.svg'; // fallback local
                }}
              />
            </td>
            <td style={{ padding: 8, verticalAlign: 'top' }}>
              <div style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {a.description}
              </div>
            </td>
            <td style={{ padding: 8, verticalAlign: 'top' }}>
              <Link href={`/authors/${a.id}/edit`} style={{ marginRight: 12 }}>Editar</Link>
              <button
                onClick={() => onDelete(a.id, a.name)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid #991b1b',
                  background: '#fee2e2',
                  color: '#991b1b',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
