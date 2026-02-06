# Architecture Document

## 1. High-Level Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │  SQL    │                 │
│    Frontend     │ ──────► │    Backend      │ ──────► │   PostgreSQL    │
│    (React)      │ ◄────── │   (Express)     │ ◄────── │    (NeonDB)     │
│                 │  JSON   │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
   localhost:5173              localhost:5000              Cloud Database
```

### Frontend → Backend Communication
- Frontend makes HTTP requests using Axios
- Backend responds with JSON data
- CORS enabled to allow cross-origin requests
- RESTful API design with proper HTTP methods

### Backend Layers (MVC Pattern)

```
Request → Routes → Controllers → Prisma ORM → Database
                       ↓
                  Validators (Zod)
```

| Layer       | Responsibility                                |
|-------------|-----------------------------------------------|
| Routes      | Define API endpoints and HTTP methods         |
| Controllers | Handle request/response, call Prisma          |
| Validators  | Validate input data using Zod schemas         |
| Prisma      | Database queries and data mapping             |

## 2. Data Model Decisions

### Why This Structure?

**Tickets Table**
```
Ticket
├── id (UUID)           → Unique identifier, auto-generated
├── title (String)      → Short summary for list view
├── description (Text)  → Full details
├── status (Enum)       → OPEN, IN_PROGRESS, RESOLVED
├── priority (Enum)     → LOW, MEDIUM, HIGH
├── createdAt           → For sorting by date
└── updatedAt           → Track last modification
```

**Comments Table**
```
Comment
├── id (UUID)           → Unique identifier
├── ticketId (FK)       → Links to parent ticket
├── authorName (String) → Who wrote the comment
├── message (Text)      → Comment content
└── createdAt           → When it was posted
```

### Design Choices

1. **UUID for IDs**: Instead of auto-increment integers
   - More secure (can't guess next ID)
   - Works well in distributed systems

2. **Enums for Status/Priority**: Instead of plain strings
   - Database enforces valid values
   - Prevents typos and invalid data

3. **Cascade Delete**: When ticket is deleted, comments are also deleted
   - Maintains data integrity
   - No orphaned comments

4. **No User Table**: Simplified design since authentication is not required
   - Author name stored as string in comments
   - Would add User table if authentication needed

## 3. Scalability Considerations

### Large Ticket List
- **Pagination**: Backend returns 10 tickets per page by default
- **Lazy Loading**: Frontend only loads one page at a time
- **Database Indexing**: Prisma creates indexes on primary keys automatically

### Search Performance
- **Server-Side Search**: Search query sent to backend
- **Database Search**: PostgreSQL `LIKE` query with case-insensitive matching
- **Improvement**: Could add full-text search index for better performance

```sql
-- Future improvement: Add GIN index for full-text search
CREATE INDEX tickets_search_idx ON tickets 
USING GIN (to_tsvector('english', title || ' ' || description));
```

### Pagination Strategy
- **Offset-based**: Using `page` and `limit` parameters
- **Returns metadata**: Total count and total pages
- **Improvement**: Could use cursor-based pagination for very large datasets

## 4. Reliability

### Error Handling Strategy

**Backend**
```
1. Route receives request
2. Validator checks input → Returns 400 if invalid
3. Controller checks if resource exists → Returns 404 if not found
4. Database operation → Returns 500 if fails
5. Success → Returns 200/201 with data
```

**Frontend**
```
1. Show loading state while fetching
2. Try API call
3. Success → Update UI with data
4. Error → Show error message to user
5. Hide loading state
```

### Validation

| Layer    | What is Validated                          |
|----------|-------------------------------------------|
| Frontend | Form fields before submit (length, required) |
| Backend  | All input with Zod schemas                 |
| Database | Enums, foreign keys, non-null constraints  |

### Edge Cases Handled

1. **Empty search results**: Shows "No tickets found" message
2. **Invalid ticket ID**: Returns 404 error
3. **Empty description**: Blocked by validation (min 20 chars)
4. **Extremely long text**: Blocked by max length validation
5. **Network error**: Shows error message, can retry

## 5. Tradeoffs

### What Was Intentionally Skipped

| Feature              | Reason for Skipping                        |
|----------------------|-------------------------------------------|
| Authentication       | Not required, keeps code simple            |
| Soft Delete          | Hard delete is simpler, data not critical  |
| Rate Limiting        | Not needed for demo app                    |
| Caching              | Database is fast enough for small scale    |
| WebSocket Updates    | Polling/refresh is acceptable              |
| File Attachments     | Adds complexity, not in requirements       |

### Trade-off Decisions

1. **Plain CSS vs UI Library**
   - Chose: Plain CSS
   - Reason: Simpler, no extra dependencies, full control

2. **React Hooks vs Redux/Zustand**
   - Chose: React Hooks (useState, useEffect)
   - Reason: App is simple, no complex state sharing needed

3. **SQLite vs PostgreSQL**
   - Chose: PostgreSQL (NeonDB)
   - Reason: Production-ready, cloud-hosted, better for learning

4. **REST vs GraphQL**
   - Chose: REST
   - Reason: Simpler for CRUD operations, well understood

5. **Server-Side Search vs Client-Side**
   - Chose: Server-Side
   - Reason: Scales better, doesn't load all data to browser

### What Would Be Added for Production

1. **Authentication**: User login/registration with JWT
2. **Authorization**: Users can only modify their own tickets
3. **Rate Limiting**: Prevent API abuse
4. **Input Sanitization**: Prevent XSS attacks
5. **Logging Service**: Send logs to service like Datadog
6. **Tests**: Unit tests and integration tests
7. **CI/CD**: Automated deployment pipeline
8. **Monitoring**: Error tracking, performance monitoring
