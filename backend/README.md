# Backend – API de Playlists (NestJS + Prisma + SQLite)

## Requisitos
- Node.js 18+
- npm

## Instalación

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

La API queda disponible en `http://localhost:3000/api`.

## Endpoints principales

### Auth
- `POST /api/auth/register` → `{ email, password }`
- `POST /api/auth/login` → `{ email, password }` → devuelve `{ accessToken, user }`

### Songs (canciones)
- `GET /api/songs?page=1&limit=10&search=texto` → público, con búsqueda y paginación
- `GET /api/songs/:id` → público
- `POST /api/songs` → requiere `Authorization: Bearer <token>`
- `PATCH /api/songs/:id` → requiere token
- `DELETE /api/songs/:id` → requiere token

## Notas
- El modelo `Song` tiene `id`, `name` (nombre) y `singer` (cantante), según lo pedido: "cada canción debe tener el nombre, cantante y ya".
- Las contraseñas se guardan con `bcrypt`.
- Si quieres inspeccionar la base de datos: `npx prisma studio`.
