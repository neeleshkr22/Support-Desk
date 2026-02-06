import { Request, Response } from 'express';
import prisma from '../config/database';
import { createTicketSchema, updateTicketSchema } from '../validators/schemas';
import { Status, Priority, Prisma } from '@prisma/client';

// GET /tickets - Get all tickets with filters
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const { q, status, priority, sort, page = '1', limit = '10' } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Build where clause
        const where: Prisma.TicketWhereInput = {};

        if (q) {
            where.OR = [
                { title: { contains: q as string, mode: 'insensitive' } },
                { description: { contains: q as string, mode: 'insensitive' } }
            ];
        }

        if (status) {
            where.status = status as Status;
        }

        if (priority) {
            where.priority = priority as Priority;
        }

        // Get total count
        const total = await prisma.ticket.count({ where });

        // Get tickets
        const tickets = await prisma.ticket.findMany({
            where,
            orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' },
            skip,
            take: limitNum
        });

        res.json({
            tickets,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error getting tickets:', error);
        res.status(500).json({ error: 'Failed to get tickets' });
    }
};

// GET /tickets/:id - Get single ticket
export const getTicketById = async (req: Request, res: Response) => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: req.params.id }
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        console.error('Error getting ticket:', error);
        res.status(500).json({ error: 'Failed to get ticket' });
    }
};

// POST /tickets - Create new ticket
export const createTicket = async (req: Request, res: Response) => {
    try {
        const validation = createTicketSchema.safeParse(req.body);

        if (!validation.success) {
            const errors = validation.error.errors.map(e => e.message);
            return res.status(400).json({ error: errors.join(', ') });
        }

        const { title, description, priority } = validation.data;

        const ticket = await prisma.ticket.create({
            data: {
                title,
                description,
                priority: priority as Priority || 'MEDIUM'
            }
        });

        res.status(201).json(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
};

// PATCH /tickets/:id - Update ticket
export const updateTicket = async (req: Request, res: Response) => {
    try {
        const validation = updateTicketSchema.safeParse(req.body);

        if (!validation.success) {
            const errors = validation.error.errors.map(e => e.message);
            return res.status(400).json({ error: errors.join(', ') });
        }

        // Check if ticket exists
        const existing = await prisma.ticket.findUnique({
            where: { id: req.params.id }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        const ticket = await prisma.ticket.update({
            where: { id: req.params.id },
            data: validation.data as any
        });

        res.json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
};

// DELETE /tickets/:id - Delete ticket
export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const existing = await prisma.ticket.findUnique({
            where: { id: req.params.id }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await prisma.ticket.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
};
