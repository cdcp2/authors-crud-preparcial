## PARCIAL WEB


# Preparcial — CRUD de Autores (Next.js + Favoritos + Accesibilidad)

App hecha con **Next.js (App Router)** que consume el API de `bookstore-back` para gestionar **autores** (CRUD) y, además, agrega **favoritos** solo en el frontend. Está escrita pensando en alguien que quiere correrla rápido y leer un README corto, sin enredos.

---

## Funcionalidades

- **CRUD de autores**:
  - Listar `/authors`
  - Crear `/crear`
  - Editar `/authors/[id]/edit`
  - Eliminar desde la lista
- **Favoritos (solo frontend)**:
  - Botón para marcar favoritos en cada autor (estrella)
  - Vista `/favoritos` con solo los marcados
  - Se mantienemientras navegas
- **Accesibilidad (elegida para la Parte B)**:
  - Navegación por teclado (Tab/Enter/Espacio)
  - `aria-pressed`, `aria-label`, `role="alert"`, etc.

---

##Arquitectura

- **Estado global con Context + Custom Hook**:
  - `AuthorsContext` maneja `authors`, `loading`, `error` y acciones `create/update/remove/refresh`.
  - `useAuthors()` expone ese estado y acciones.
  - **Favoritos** (`favorites: number[]`) viven también en el Context.
- **Capas**:
  - `src/app/…` → páginas
  - `src/components/…` → componentes de UI (lista, formulario, navbar)
  - `src/context/…` → provider/estado global
  - `src/hooks/…` → custom hook `useAuthors`
  - `src/lib/…` → funciones `fetch` a `/api/authors` (Next reescribe al backend)
  - `src/types/…` → tipos TS (`Author`, `NewAuthor`)

> **Nota**: El proyecto usa un rewrite para que las llamadas del frontend a `/api/authors` vayan al servidor real del backend en `127.0.0.1:8080`.
---

## Cómo correr la app (frontend)

**Requisitos**:
- Node 18+ (recomendado LTS)

**Pasos**:
```bash
# 1) Instala dependencias
npm install

# 2) Arranca el frontend
npm run dev

# 3) Abre en el navegador
# http://localhost:3000/authors
```
# Parte A
