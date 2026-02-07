import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TicketsList from './pages/TicketsList';
import TicketDetail from './pages/TicketDetail';
import CreateTicket from './pages/CreateTicket';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm font-mono">SD</span>
                        </div>
                        <span className="font-semibold text-lg font-mono">Support Desk</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
                            Home
                        </Link>
                        <Link to="/tickets" className="text-gray-600 hover:text-gray-900 transition">
                            Tickets
                        </Link>
                        <Link 
                            to="/create" 
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            + New Ticket
                        </Link>
                    </div>
                </div>
            </nav>
            
            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/tickets" element={
                    <Layout>
                        <TicketsList />
                    </Layout>
                } />
                <Route path="/tickets/:id" element={
                    <Layout>
                        <TicketDetail />
                    </Layout>
                } />
                <Route path="/create" element={
                    <Layout>
                        <CreateTicket />
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
