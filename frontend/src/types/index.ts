// Ticket types
export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketData {
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UpdateTicketData {
    title?: string;
    description?: string;
    status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Comment types
export interface Comment {
    id: string;
    ticketId: string;
    authorName: string;
    message: string;
    createdAt: string;
}

export interface CreateCommentData {
    authorName: string;
    message: string;
}

// API response types
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TicketsResponse {
    tickets: Ticket[];
    pagination: PaginationInfo;
}

export interface CommentsResponse {
    comments: Comment[];
    pagination: PaginationInfo;
}

// Filter types
export interface TicketFilters {
    q?: string;
    status?: string;
    priority?: string;
    sort?: 'newest' | 'oldest';
    page?: number;
    limit?: number;
}
