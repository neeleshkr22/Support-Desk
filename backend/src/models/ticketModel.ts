import { Status, Priority } from '@prisma/client';

export interface CreateTicketInput {
    title: string;
    description: string;
    priority?: Priority;
}

export interface UpdateTicketInput {
    title?: string;
    description?: string;
    status?: Status;
    priority?: Priority;
}

export interface TicketFilters {
    q?: string;
    status?: Status;
    priority?: Priority;
    sort?: 'newest' | 'oldest';
    page?: number;
    limit?: number;
}
