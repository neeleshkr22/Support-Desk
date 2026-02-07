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
            <Link to="/tickets" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Tickets
            </Link>
            
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Ticket</h1>

                    {errors.general && (
                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="ticket-title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="ticket-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Brief summary of the issue"
                                maxLength={80}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition ${
                                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            <p className="mt-1 text-sm text-gray-500">{title.length}/80</p>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="ticket-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="ticket-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide detailed information about your issue..."
                                maxLength={2000}
                                rows={6}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition resize-none ${
                                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            <p className="mt-1 text-sm text-gray-500">{description.length}/2000</p>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="ticket-priority" className="block text-sm font-medium text-gray-700 mb-2">
                                Priority
                            </label>
                            <select
                                id="ticket-priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
                            >
                                <option value="LOW">Low - Minor issue, no rush</option>
                                <option value="MEDIUM">Medium - Normal priority</option>
                                <option value="HIGH">High - Urgent, needs immediate attention</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
                                disabled={submitting}
                            >
                                {submitting ? 'Creating...' : 'Create Ticket'}
                            </button>
                            <Link 
                                to="/tickets" 
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
