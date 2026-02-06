import axios from 'axios';
import type {
    Ticket,
    CreateTicketData,
    UpdateTicketData,
    Comment,
    CreateCommentData,
    TicketsResponse,
    CommentsResponse,
    TicketFilters
} from '../types';

const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Ticket API calls
export const ticketApi = {
    // Get all tickets with filters
    getAll: async (filters: TicketFilters = {}): Promise<TicketsResponse> => {
        const params = new URLSearchParams();
        
        if (filters.q) params.append('q', filters.q);
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const response = await api.get(`/tickets?${params.toString()}`);
        return response.data;
    },

    // Get single ticket
    getById: async (id: string): Promise<Ticket> => {
        const response = await api.get(`/tickets/${id}`);
        return response.data;
    },

    // Create ticket
    create: async (data: CreateTicketData): Promise<Ticket> => {
        const response = await api.post('/tickets', data);
        return response.data;
    },

    // Update ticket
    update: async (id: string, data: UpdateTicketData): Promise<Ticket> => {
        const response = await api.patch(`/tickets/${id}`, data);
        return response.data;
    },

    // Delete ticket
    delete: async (id: string): Promise<void> => {
        await api.delete(`/tickets/${id}`);
    }
};

// Comment API calls
export const commentApi = {
    // Get comments for a ticket
    getByTicketId: async (ticketId: string, page: number = 1): Promise<CommentsResponse> => {
        const response = await api.get(`/tickets/${ticketId}/comments?page=${page}&limit=10`);
        return response.data;
    },

    // Add comment
    create: async (ticketId: string, data: CreateCommentData): Promise<Comment> => {
        const response = await api.post(`/tickets/${ticketId}/comments`, data);
        return response.data;
    }
};
