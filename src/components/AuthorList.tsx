'use client';

import Link from 'next/link';
import { useAuthors } from '@/hooks/useAuthors';

type Props = { onlyFavorites?: boolean };

export default function AuthorList({ onlyFavorites = false }: Props) {
  const { authors, loading, error, remove, isFavorite, toggleFavorite } = useAuthors();

  const list = onlyFavorites ? authors.filter((a) => isFavorite(a.id)) : authors;

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
  if (list.length === 0) return <p>{onlyFavorites ? 'No hay favoritos aún.' : 'No hay autores aún.'}</p>;

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
        {list.map((a) => {
          const fav = isFavorite(a.id);
          return (
            <tr key={a.id}>
              <td style={{ padding: 8, verticalAlign: 'top' }}>
                <span aria-label={fav ? 'Autor en favoritos' : 'Autor no favorito'}>
                  {fav ? '★ ' : '☆ '}
                </span>
                {a.name}
              </td>
              <td style={{ padding: 8, verticalAlign: 'top' }}>{a.birthDate}</td>
              <td style={{ padding: 8, verticalAlign: 'top' }}>
                <img
                  src={a.image || '/next.svg'}
                  alt={`Foto de ${a.name}`}
                  width={64}
                  height={64}
                  style={{
                    width: 64, height: 64, objectFit: 'cover',
                    borderRadius: 8, border: '1px solid #e5e7eb'
                  }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/next.svg'; }}
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
              <td style={{ padding: 8, verticalAlign: 'top', display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => toggleFavorite(a.id)}
                  aria-pressed={fav}
                  aria-label={fav ? `Quitar ${a.name} de favoritos` : `Marcar ${a.name} como favorito`}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #a16207',
                    background: fav ? '#fde68a' : '#fff7ed',
                    color: '#a16207',
                  }}
                >
                  {fav ? '★ Favorito' : '☆ Favorito'}
                </button>

                <Link
                  href={`/authors/${a.id}/edit`}
                  aria-label={`Editar a ${a.name}`}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #111827',
                  }}
                >
                  Editar
                </Link>

                <button
                  type="button"
                  onClick={() => onDelete(a.id, a.name)}
                  aria-label={`Eliminar a ${a.name}`}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #991b1b',
                    background: '#fee2e2',
                    color: '#991b1b',
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
