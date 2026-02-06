import { Request, Response } from 'express';
import prisma from '../config/database';
import { createCommentSchema } from '../validators/schemas';

// GET /tickets/:id/comments - Get comments for a ticket
export const getComments = async (req: Request, res: Response) => {
    try {
        const { page = '1', limit = '10' } = req.query;
        const ticketId = req.params.id;

        // Check if ticket exists
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Get total count
        const total = await prisma.comment.count({
            where: { ticketId }
        });

        // Get comments
        const comments = await prisma.comment.findMany({
            where: { ticketId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limitNum
        });

        res.json({
            comments,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
};

// POST /tickets/:id/comments - Add comment to ticket
export const createComment = async (req: Request, res: Response) => {
    try {
        const ticketId = req.params.id;

        // Check if ticket exists
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const validation = createCommentSchema.safeParse(req.body);

        if (!validation.success) {
            const errors = validation.error.errors.map(e => e.message);
            return res.status(400).json({ error: errors.join(', ') });
        }

        const { authorName, message } = validation.data;

        const comment = await prisma.comment.create({
            data: {
                ticketId,
                authorName,
                message
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};
