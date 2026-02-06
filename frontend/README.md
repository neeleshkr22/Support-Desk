# Support Desk Frontend

A React frontend for the Mini Support Desk application.

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Plain CSS (no external UI library)

## Why These Choices?

### State Management: React Hooks
I chose React's built-in hooks (useState, useEffect) instead of Redux or Zustand because:
- The app is small with simple data flow
- No complex state sharing between unrelated components
- Built-in hooks are simpler and have no extra dependencies
- Easier to understand for beginners

### Styling: Plain CSS
- Keeps the project simple without learning a CSS framework
- Full control over styles
- No build configuration needed

### Search: Server-Side
- Server-side search is implemented (sends search query to API)
- Better for large datasets - doesn't load all data at once
- Database can use indexes for faster searching

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── TicketsList.tsx     # Main tickets list page
│   │   ├── TicketDetail.tsx    # Single ticket view with comments
│   │   └── CreateTicket.tsx    # New ticket form
│   ├── services/
│   │   └── api.ts              # API calls using axios
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app with routing
│   ├── App.css                 # All styles
│   ├── index.css               # CSS reset
│   └── main.tsx                # Entry point
├── package.json
└── vite.config.ts
```

## Features

### Tickets List Page
- View all support tickets
- Search by title/description (server-side)
- Filter by status (Open, In Progress, Resolved)
- Filter by priority (Low, Medium, High)
- Sort by date (newest/oldest)
- Pagination

### Ticket Detail Page
- View full ticket details
- Change ticket status with dropdown
- View all comments
- Add new comments
- Delete ticket

### Create Ticket Page
- Form with title, description, priority
- Client-side validation
- Error messages for invalid input

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

**Note**: Make sure the backend is running at `http://localhost:5000`

### 3. Build for Production
```bash
npm run build
```

## Accessibility

- All form inputs have labels
- Keyboard navigation works for all interactive elements
- Semantic HTML elements used
- ARIA labels on search and filter inputs

## Loading & Error States

- Loading spinners while fetching data
- Error messages displayed when API calls fail
- Empty state shown when no tickets found
