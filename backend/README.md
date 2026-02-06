# Support Desk Backend API

A REST API for managing support tickets built with Express.js, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **Validation**: Zod

## Project Structure (MVC Pattern)

```
backend/
├── prisma/
│   └── schema.prisma        # Database schema
├── src/
│   ├── config/
│   │   └── database.ts      # Prisma client setup
│   ├── controllers/
│   │   ├── ticketController.ts
│   │   └── commentController.ts
│   ├── models/
│   │   ├── ticketModel.ts   # TypeScript interfaces
│   │   └── commentModel.ts
│   ├── routes/
│   │   ├── ticketRoutes.ts
│   │   └── commentRoutes.ts
│   ├── validators/
│   │   └── schemas.ts       # Zod validation schemas
│   ├── index.ts             # App entry point
│   └── seed.ts              # Database seeder
├── .env                     # Environment variables
├── package.json
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file with your NeonDB connection string:
```
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
PORT=5000
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed sample data
npm run seed
```

### 4. Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

Server runs at: `http://localhost:5000`

---

## API Documentation

### Base URL
```
http://localhost:5000
```

---

## Tickets API

### GET /tickets
Get all tickets with filters and pagination.

**Query Parameters:**
| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| q         | string | Search in title and description      |
| status    | string | Filter by status (OPEN, IN_PROGRESS, RESOLVED) |
| priority  | string | Filter by priority (LOW, MEDIUM, HIGH) |
| sort      | string | Sort order: "newest" (default) or "oldest" |
| page      | number | Page number (default: 1)             |
| limit     | number | Items per page (default: 10)         |

**Example Request:**
```bash
GET /tickets?status=OPEN&priority=HIGH&page=1&limit=10
```

**Response (200):**
```json
{
  "tickets": [
    {
      "id": "uuid",
      "title": "Login issue",
      "description": "Cannot login to my account...",
      "status": "OPEN",
      "priority": "HIGH",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

### GET /tickets/:id
Get a single ticket by ID.

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Login issue",
  "description": "Cannot login to my account...",
  "status": "OPEN",
  "priority": "HIGH",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (404):**
```json
{
  "error": "Ticket not found"
}
```

---

### POST /tickets
Create a new ticket.

**Request Body:**
```json
{
  "title": "Login page not working",
  "description": "When I try to access the login page, it shows a blank screen...",
  "priority": "HIGH"
}
```

**Validation Rules:**
- `title`: Required, 5-80 characters
- `description`: Required, 20-2000 characters
- `priority`: Optional, one of: LOW, MEDIUM, HIGH (default: MEDIUM)

**Response (201):**
```json
{
  "id": "uuid",
  "title": "Login page not working",
  "description": "When I try to access the login page...",
  "status": "OPEN",
  "priority": "HIGH",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (400):**
```json
{
  "error": "Title must be at least 5 characters"
}
```

---

### PATCH /tickets/:id
Update a ticket.

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description...",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

**Validation Rules:**
- `title`: 5-80 characters
- `description`: 20-2000 characters
- `status`: One of: OPEN, IN_PROGRESS, RESOLVED
- `priority`: One of: LOW, MEDIUM, HIGH

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Updated title",
  "description": "Updated description...",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

---

### DELETE /tickets/:id
Delete a ticket and its comments.

**Response (200):**
```json
{
  "message": "Ticket deleted successfully"
}
```

---

## Comments API

### GET /tickets/:id/comments
Get comments for a ticket with pagination.

**Query Parameters:**
| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| page      | number | Page number (default: 1) |
| limit     | number | Items per page (default: 10) |

**Response (200):**
```json
{
  "comments": [
    {
      "id": "uuid",
      "ticketId": "ticket-uuid",
      "authorName": "John Doe",
      "message": "I am also facing this issue",
      "createdAt": "2024-01-15T11:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### POST /tickets/:id/comments
Add a comment to a ticket.

**Request Body:**
```json
{
  "authorName": "John Doe",
  "message": "Thanks for looking into this issue!"
}
```

**Validation Rules:**
- `authorName`: Required, 1-50 characters
- `message`: Required, 1-500 characters

**Response (201):**
```json
{
  "id": "uuid",
  "ticketId": "ticket-uuid",
  "authorName": "John Doe",
  "message": "Thanks for looking into this issue!",
  "createdAt": "2024-01-15T11:30:00.000Z"
}
```

---

## Error Responses

| Status Code | Description                    |
|-------------|--------------------------------|
| 400         | Bad Request - Validation error |
| 404         | Not Found - Resource not found |
| 500         | Internal Server Error          |

**Error Format:**
```json
{
  "error": "Error message here"
}
```

---

## Data Models

### Ticket
| Field       | Type     | Description                      |
|-------------|----------|----------------------------------|
| id          | UUID     | Unique identifier                |
| title       | String   | Ticket title (5-80 chars)        |
| description | String   | Ticket description (20-2000 chars) |
| status      | Enum     | OPEN, IN_PROGRESS, RESOLVED      |
| priority    | Enum     | LOW, MEDIUM, HIGH                |
| createdAt   | DateTime | Creation timestamp               |
| updatedAt   | DateTime | Last update timestamp            |

### Comment
| Field      | Type     | Description                |
|------------|----------|----------------------------|
| id         | UUID     | Unique identifier          |
| ticketId   | UUID     | Reference to ticket        |
| authorName | String   | Commenter name (1-50 chars)|
| message    | String   | Comment text (1-500 chars) |
| createdAt  | DateTime | Creation timestamp         |

---

## Scripts

| Command              | Description                    |
|----------------------|--------------------------------|
| `npm run dev`        | Start development server       |
| `npm run build`      | Build for production           |
| `npm start`          | Start production server        |
| `npm run seed`       | Seed database with sample data |
| `npx prisma generate`| Generate Prisma client         |
| `npx prisma db push` | Push schema to database        |
| `npx prisma studio`  | Open Prisma database viewer    |
