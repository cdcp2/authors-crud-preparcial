'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Author, NewAuthor } from '@/types/author';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '@/lib/api';

type AuthorsContextType = {
  authors: Author[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (payload: NewAuthor) => Promise<void>;
  update: (id: number, payload: Partial<Author>) => Promise<void>;
  remove: (id: number) => Promise<void>;


  favorites: number[];                   
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

export function AuthorsProvider({ children }: { children: ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [favorites, setFavorites] = useState<number[]>([]);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAuthors();
      setAuthors(data);
    } catch (e: any) {
      setError(e.message ?? 'Error cargando autores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const create = async (payload: NewAuthor) => {
    const created = await createAuthor(payload);
    setAuthors((prev) => [...prev, created]);
  };

  const update = async (id: number, payload: Partial<Author>) => {
    const updated = await updateAuthor(id, payload);
    setAuthors((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  const remove = async (id: number) => {
    await deleteAuthor(id);
    setAuthors((prev) => prev.filter((a) => a.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id)); 
  };

  const isFavorite = (id: number) => favorites.includes(id);
  const toggleFavorite = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <AuthorsContext.Provider
      value={{
        authors, loading, error, refresh, create, update, remove,
        favorites, isFavorite, toggleFavorite,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthorsContext() {
  const ctx = useContext(AuthorsContext);
  if (!ctx) throw new Error('useAuthorsContext debe usarse dentro de <AuthorsProvider>');
  return ctx;
}
