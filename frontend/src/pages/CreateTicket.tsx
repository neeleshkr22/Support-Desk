import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ticketApi } from '../services/api';

function CreateTicket() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; description?: string; general?: string }>({});

    // Validate form
    const validateForm = () => {
        const newErrors: typeof errors = {};
        
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        } else if (title.trim().length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        } else if (title.trim().length > 80) {
            newErrors.title = 'Title cannot exceed 80 characters';
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
        } else if (description.trim().length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        } else if (description.trim().length > 2000) {
            newErrors.description = 'Description cannot exceed 2000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            setErrors({});
            
            const ticket = await ticketApi.create({
                title: title.trim(),
                description: description.trim(),
                priority
            });
            
            navigate(`/tickets/${ticket.id}`);
        } catch (err: unknown) {
            console.error('Error creating ticket:', err);
            const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
            setErrors({
                general: errorMessage || 'Failed to create ticket. Please try again.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Link to="/" className="back-link">← Back to Tickets</Link>
            
            <div className="card" style={{ maxWidth: '600px' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>Create New Ticket</h1>

                {errors.general && (
                    <div className="error-message">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ticket-title">Title *</label>
                        <input
                            type="text"
                            id="ticket-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Brief summary of the issue"
                            maxLength={80}
                        />
                        {errors.title && <div className="form-error">{errors.title}</div>}
                        <small style={{ color: '#6b7280' }}>{title.length}/80</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ticket-description">Description *</label>
                        <textarea
                            id="ticket-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide detailed information about your issue..."
                            maxLength={2000}
                            rows={6}
                        />
                        {errors.description && <div className="form-error">{errors.description}</div>}
                        <small style={{ color: '#6b7280' }}>{description.length}/2000</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ticket-priority">Priority</label>
                        <select
                            id="ticket-priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                        >
                            <option value="LOW">Low - Minor issue, no rush</option>
                            <option value="MEDIUM">Medium - Normal priority</option>
                            <option value="HIGH">High - Urgent, needs immediate attention</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button 
                            type="submit" 
                            className="btn btn-blue"
                            disabled={submitting}
                        >
                            {submitting ? 'Creating...' : 'Create Ticket'}
                        </button>
                        <Link to="/" className="btn btn-gray">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket;
