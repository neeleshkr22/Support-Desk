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
            navigate('/');
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

    // Get badge classes
    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'LOW': return 'badge badge-low';
            case 'MEDIUM': return 'badge badge-medium';
            case 'HIGH': return 'badge badge-high';
            default: return 'badge';
        }
    };

    if (loading) {
        return <div className="loading">Loading ticket...</div>;
    }

    if (error || !ticket) {
        return (
            <div>
                <div className="error-message">{error || 'Ticket not found'}</div>
                <Link to="/" className="back-link">← Back to Tickets</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/" className="back-link">← Back to Tickets</Link>
            
            <div className="card">
                <div className="ticket-header">
                    <div>
                        <h1 className="ticket-title">{ticket.title}</h1>
                        <div className="ticket-meta">
                            <span className={getPriorityClass(ticket.priority)}>
                                {ticket.priority} Priority
                            </span>
                            <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                                Created: {formatDate(ticket.createdAt)}
                            </span>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <label htmlFor="status-select" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            Status:
                        </label>
                        <select
                            id="status-select"
                            className="status-select"
                            value={ticket.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={updating}
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="ticket-description">
                    {ticket.description}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        Last updated: {formatDate(ticket.updatedAt)}
                    </span>
                    <button onClick={handleDelete} className="btn btn-red">
                        Delete Ticket
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
                <h3>Comments ({comments.length})</h3>

                {/* Add Comment Form */}
                <div className="comment-form">
                    <h4>Add a Comment</h4>
                    <form onSubmit={handleCommentSubmit}>
                        {commentError && <div className="error-message">{commentError}</div>}
                        
                        <div className="form-group">
                            <label htmlFor="author-name">Your Name</label>
                            <input
                                type="text"
                                id="author-name"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                placeholder="Enter your name"
                                maxLength={50}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment-message">Message</label>
                            <textarea
                                id="comment-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your comment..."
                                maxLength={500}
                            />
                            <small style={{ color: '#6b7280' }}>{message.length}/500</small>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-blue"
                            disabled={submitting}
                        >
                            {submitting ? 'Adding...' : 'Add Comment'}
                        </button>
                    </form>
                </div>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <div className="empty-state" style={{ marginTop: '1rem' }}>
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    <div style={{ marginTop: '1rem' }}>
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <span className="comment-author">{comment.authorName}</span>
                                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p>{comment.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TicketDetail;
