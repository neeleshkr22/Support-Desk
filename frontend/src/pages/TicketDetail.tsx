import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ticketApi, commentApi } from '../services/api';
import type { Ticket, Comment } from '../types';

function TicketDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Comment form
    const [authorName, setAuthorName] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [commentError, setCommentError] = useState('');

    // Status update
    const [updating, setUpdating] = useState(false);

    // Fetch ticket and comments
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                setError('');
                
                const ticketData = await ticketApi.getById(id);
                setTicket(ticketData);
                
                const commentsData = await commentApi.getByTicketId(id);
                setComments(commentsData.comments);
            } catch (err) {
                setError('Failed to load ticket. Please try again.');
                console.error('Error fetching ticket:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Handle status change
    const handleStatusChange = async (newStatus: string) => {
        if (!id || !ticket) return;
        
        try {
            setUpdating(true);
            const updated = await ticketApi.update(id, { 
                status: newStatus as Ticket['status'] 
            });
            setTicket(updated);
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    // Handle comment submit
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id) return;
        
        // Validate
        if (!authorName.trim()) {
            setCommentError('Please enter your name');
            return;
        }
        if (!message.trim()) {
            setCommentError('Please enter a message');
            return;
        }
        if (message.length > 500) {
            setCommentError('Message cannot exceed 500 characters');
            return;
        }

        try {
            setSubmitting(true);
            setCommentError('');
            
            const newComment = await commentApi.create(id, {
                authorName: authorName.trim(),
                message: message.trim()
            });
            
            setComments([newComment, ...comments]);
            setAuthorName('');
            setMessage('');
        } catch (err) {
            setCommentError('Failed to add comment. Please try again.');
            console.error('Error adding comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete ticket
    const handleDelete = async () => {
        if (!id) return;
        
        if (!window.confirm('Are you sure you want to delete this ticket?')) {
            return;
        }

        try {
            await ticketApi.delete(id);
            navigate('/tickets');
        } catch (err) {
            console.error('Error deleting ticket:', err);
            alert('Failed to delete ticket. Please try again.');
        }
    };

    // Format date
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get priority style
    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'LOW': return 'bg-gray-100 text-gray-600';
            case 'MEDIUM': return 'bg-orange-100 text-orange-700';
            case 'HIGH': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // Get status style
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-amber-100 text-amber-700';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12 text-gray-500">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-black mb-4"></div>
                <p>Loading ticket...</p>
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div>
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error || 'Ticket not found'}
                </div>
                <Link to="/tickets" className="text-blue-600 hover:underline">
                    ← Back to Tickets
                </Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/tickets" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Tickets
            </Link>
            
            {/* Ticket Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.title}</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(ticket.priority)}`}>
                                {ticket.priority} Priority
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(ticket.status)}`}>
                                {ticket.status.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500">
                                Created {formatDate(ticket.createdAt)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <label htmlFor="status-select" className="text-sm text-gray-600">
                            Change Status:
                        </label>
                        <select
                            id="status-select"
                            value={ticket.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={updating}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                        Last updated: {formatDate(ticket.updatedAt)}
                    </span>
                    <button 
                        onClick={handleDelete} 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Delete Ticket
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>

                {/* Add Comment Form */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium mb-4">Add a Comment</h4>
                    <form onSubmit={handleCommentSubmit}>
                        {commentError && (
                            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
                                {commentError}
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="author-name"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                placeholder="Enter your name"
                                maxLength={50}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="comment-message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="comment-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your comment..."
                                maxLength={500}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                            />
                            <small className="text-gray-500">{message.length}/500</small>
                        </div>

                        <button 
                            type="submit" 
                            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                            disabled={submitting}
                        >
                            {submitting ? 'Adding...' : 'Add Comment'}
                        </button>
                    </form>
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-900">{comment.authorName}</span>
                                    <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p className="text-gray-700">{comment.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TicketDetail;
