import { z } from 'zod';

// Ticket validation schemas
export const createTicketSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(80, 'Title cannot exceed 80 characters'),
    description: z.string()
        .min(20, 'Description must be at least 20 characters')
        .max(2000, 'Description cannot exceed 2000 characters'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
});

export const updateTicketSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(80, 'Title cannot exceed 80 characters')
        .optional(),
    description: z.string()
        .min(20, 'Description must be at least 20 characters')
        .max(2000, 'Description cannot exceed 2000 characters')
        .optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
});

// Comment validation schema
export const createCommentSchema = z.object({
    authorName: z.string()
        .min(1, 'Author name is required')
        .max(50, 'Author name cannot exceed 50 characters'),
    message: z.string()
        .min(1, 'Message must be at least 1 character')
        .max(500, 'Message cannot exceed 500 characters')
});
