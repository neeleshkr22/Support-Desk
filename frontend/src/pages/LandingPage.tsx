import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 font-mono">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SD</span>
                    </div>
                    <span className="font-semibold text-lg">Support Desk</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/tickets" className="text-gray-600 hover:text-gray-900 transition">
                        View Tickets
                    </Link>
                    <Link 
                        to="/tickets" 
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-8">
                        <span className="text-sm text-gray-600">For fast moving support teams</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-mono">
                        Manage and resolve{' '}
                        <br />
                        <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                            support tickets
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                        We empower support teams to create, track, and manage customer 
                        tickets efficiently with a clean and intuitive interface.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <Link 
                            to="/tickets" 
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            Start building
                        </Link>
                        <Link 
                            to="/create" 
                            className="text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
                        >
                            Create a ticket
                        </Link>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                            ))}
                        </div>
                        <span>Trusted by 1000+ support teams</span>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="px-8 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-2 shadow-2xl shadow-gray-200/50">
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="bg-gray-100 rounded-lg px-4 py-1 text-sm text-gray-500">
                                        support-desk.app/tickets
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6">
                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white border border-gray-100 rounded-xl p-4">
                                        <div className="text-2xl font-bold">128</div>
                                        <div className="text-sm text-gray-500">Total Tickets</div>
                                        <div className="text-xs text-green-600 mt-1">↑ 12%</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-amber-500">96.7%</div>
                                        <div className="text-sm text-gray-500">Resolution Rate</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4">
                                        <div className="text-2xl font-bold">12.4h</div>
                                        <div className="text-sm text-gray-500">Avg Response Time</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-blue-500">GPT-4</div>
                                        <div className="text-sm text-gray-500">AI Assistant</div>
                                    </div>
                                </div>

                                {/* Ticket List Preview */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                            <span className="font-medium">Login page not loading properly</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Open</span>
                                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                            <span className="font-medium">Password reset email not arriving</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">In Progress</span>
                                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Medium</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            <span className="font-medium">Mobile app crashes on startup</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Resolved</span>
                                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
                        <p className="text-gray-600">
                            We empower support teams to create, track, and manage tickets visually
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Track Faster</h3>
                            <p className="text-sm text-gray-600">
                                Create and track tickets without any complex setup or configuration.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Smart Filters</h3>
                            <p className="text-sm text-gray-600">
                                Filter by status, priority, and search to find exactly what you need.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Team Comments</h3>
                            <p className="text-sm text-gray-600">
                                Collaborate with your team through comments on each ticket.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Priority Levels</h3>
                            <p className="text-sm text-gray-600">
                                Set priority levels to ensure urgent issues get resolved first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                    <p className="text-gray-600 mb-8">
                        Create your first ticket and experience seamless support management.
                    </p>
                    <Link 
                        to="/tickets" 
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition font-medium text-lg"
                    >
                        Get Started
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-8 px-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-xs">SD</span>
                        </div>
                        <span>Support Desk</span>
                    </div>
                    <div>© 2026 Support Desk. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
