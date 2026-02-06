import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TicketsList from './pages/TicketsList';
import TicketDetail from './pages/TicketDetail';
import CreateTicket from './pages/CreateTicket';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="header">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            Support Desk
                        </Link>
                        <nav>
                            <Link to="/" className="nav-link">Tickets</Link>
                            <Link to="/create" className="nav-link btn-primary">
                                + New Ticket
                            </Link>
                        </nav>
                    </div>
                </header>
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<TicketsList />} />
                        <Route path="/tickets/:id" element={<TicketDetail />} />
                        <Route path="/create" element={<CreateTicket />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
