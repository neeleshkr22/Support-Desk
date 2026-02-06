# Mini Support Desk

A full-stack web application for creating, viewing, and managing support tickets.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, TypeScript, Vite, Axios      |
| Backend  | Node.js, Express, TypeScript        |
| Database | PostgreSQL (NeonDB)                 |
| ORM      | Prisma                              |

## Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL database (NeonDB recommended)

### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

Create `.env` file with your database URL:
```
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
PORT=5000
```

Setup database:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

Start backend:
```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Project Structure

```
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── src/
│   │   ├── config/               # Database config
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # TypeScript interfaces
│   │   ├── routes/               # API routes
│   │   ├── validators/           # Zod schemas
│   │   ├── index.ts              # Entry point
│   │   └── seed.ts               # Seed script
│   └── README.md                 # API documentation
│
├── frontend/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── services/             # API service
│   │   ├── types/                # TypeScript types
│   │   └── App.tsx               # Main app
│   └── README.md
│
├── ARCHITECTURE.md               # System design document
└── README.md                     # This file
```

## Features

- **Ticket Management**: Create, view, update, delete tickets
- **Comments**: Add comments to tickets
- **Filtering**: Filter by status and priority
- **Search**: Search tickets by title/description
- **Sorting**: Sort by date (newest/oldest)
- **Pagination**: Paginated ticket list

## API Endpoints

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | /tickets                   | List tickets (with filters) |
| POST   | /tickets                   | Create ticket            |
| GET    | /tickets/:id               | Get ticket details       |
| PATCH  | /tickets/:id               | Update ticket            |
| DELETE | /tickets/:id               | Delete ticket            |
| GET    | /tickets/:id/comments      | List comments            |
| POST   | /tickets/:id/comments      | Add comment              |

See [backend/README.md](backend/README.md) for full API documentation.

## Assumptions

1. Single user system - no authentication required
2. Comments cannot be edited or deleted after creation
3. Tickets are hard deleted (not soft deleted)
4. All users can modify any ticket's status
