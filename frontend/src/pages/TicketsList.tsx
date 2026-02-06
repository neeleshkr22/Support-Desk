import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ticketApi } from '../services/api';
import type { Ticket, TicketFilters, PaginationInfo } from '../types';

function TicketsList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Filters
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [page, setPage] = useState(1);

    // Fetch tickets
    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            
            const filters: TicketFilters = {
                page,
                limit: 10,
                sort: sortOrder
            };
            
            if (search) filters.q = search;
            if (statusFilter) filters.status = statusFilter;
            if (priorityFilter) filters.priority = priorityFilter;

            const response = await ticketApi.getAll(filters);
            setTickets(response.tickets);
            setPagination(response.pagination);
        } catch (err) {
            setError('Failed to load tickets. Please try again.');
            console.error('Error fetching tickets:', err);
        } finally {
            setLoading(false);
        }
    }, [page, search, statusFilter, priorityFilter, sortOrder]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // Search with debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (page !== 1) setPage(1);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [search, page]);

    // Format date
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get status badge class
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'OPEN': return 'badge badge-open';
            case 'IN_PROGRESS': return 'badge badge-in-progress';
            case 'RESOLVED': return 'badge badge-resolved';
            default: return 'badge';
        }
    };

    // Get priority badge class
    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'LOW': return 'badge badge-low';
            case 'MEDIUM': return 'badge badge-medium';
            case 'HIGH': return 'badge badge-high';
            default: return 'badge';
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Support Tickets</h1>
            </div>

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search tickets"
                />
                
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                    aria-label="Filter by status"
                >
                    <option value="">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
                    aria-label="Filter by priority"
                >
                    <option value="">All Priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => { setSortOrder(e.target.value as 'newest' | 'oldest'); setPage(1); }}
                    aria-label="Sort order"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Loading State */}
            {loading && <div className="loading">Loading tickets...</div>}

            {/* Empty State */}
            {!loading && tickets.length === 0 && (
                <div className="empty-state">
                    <p>No tickets found.</p>
                    <Link to="/create" className="btn btn-blue" style={{ marginTop: '1rem', display: 'inline-block' }}>
                        Create your first ticket
                    </Link>
                </div>
            )}

            {/* Tickets List */}
            {!loading && tickets.length > 0 && (
                <>
                    {tickets.map((ticket) => (
                        <Link
                            to={`/tickets/${ticket.id}`}
                            key={ticket.id}
                            className="ticket-card"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="ticket-info">
                                <h3>{ticket.title}</h3>
                                <div className="ticket-meta">
                                    <span>Created: {formatDate(ticket.createdAt)}</span>
                                </div>
                            </div>
                            <div className="ticket-badges">
                                <span className={getStatusClass(ticket.status)}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                                <span className={getPriorityClass(ticket.priority)}>
                                    {ticket.priority}
                                </span>
                            </div>
                        </Link>
                    ))}

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {pagination.totalPages}</span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page >= pagination.totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TicketsList;
