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

    // Get status badge styles
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-amber-100 text-amber-700';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // Get priority badge styles
    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'LOW': return 'bg-gray-100 text-gray-600';
            case 'MEDIUM': return 'bg-orange-100 text-orange-700';
            case 'HIGH': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
                    <p className="text-gray-500 mt-1">Manage and track all support requests</p>
                </div>
                <Link 
                    to="/create" 
                    className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
                >
                    + Create Ticket
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                            aria-label="Search tickets"
                        />
                    </div>
                    
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
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
                        className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
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
                        className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
                        aria-label="Sort order"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12 text-gray-500">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-black mb-4"></div>
                    <p>Loading tickets...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && tickets.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                    <div className="text-5xl mb-4">📭</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first ticket</p>
                    <Link 
                        to="/create" 
                        className="inline-block bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                        Create Ticket
                    </Link>
                </div>
            )}

            {/* Tickets List */}
            {!loading && tickets.length > 0 && (
                <div className="space-y-3">
                    {tickets.map((ticket) => (
                        <Link
                            to={`/tickets/${ticket.id}`}
                            key={ticket.id}
                            className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition group"
                        >
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 group-hover:text-black">
                                    {ticket.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Created {formatDate(ticket.createdAt)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(ticket.status)}`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(ticket.priority)}`}>
                                    {ticket.priority}
                                </span>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-6">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page <= 1}
                                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-600">
                                Page {page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page >= pagination.totalPages}
                                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TicketsList;
