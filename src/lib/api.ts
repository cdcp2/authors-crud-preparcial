import type { Author, NewAuthor } from '@/types/author';

const BASE = '/api/authors';

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(BASE, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudieron obtener los autores');
  return res.json();
}

export async function createAuthor(payload: NewAuthor): Promise<Author> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('No se pudo crear el autor');
  return res.json();
}

export async function updateAuthor(id: number, payload: Partial<Author>): Promise<Author> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('No se pudo actualizar el autor');
  return res.json();
}

export async function deleteAuthor(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('No se pudo eliminar el autor');
}
