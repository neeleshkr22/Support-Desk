import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="text-gradient">Support Desk</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your one-stop solution for managing support tickets efficiently. 
                        Create, track, and resolve issues with ease.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/tickets" className="btn btn-hero-primary">
                            Get Started →
                        </Link>
                        <a href="#features" className="btn btn-hero-secondary">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="hero-illustration">
                    <div className="floating-card card-1">
                        <div className="card-icon">🎫</div>
                        <span>New Ticket</span>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-icon">✅</div>
                        <span>Resolved</span>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-icon">💬</div>
                        <span>Comments</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <h2 className="section-title">Why Choose Support Desk?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Easy Ticket Creation</h3>
                        <p>Create support tickets in seconds with our intuitive form. Add title, description, and priority level.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Smart Search & Filter</h3>
                        <p>Find tickets quickly with powerful search. Filter by status, priority, or sort by date.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💬</div>
                        <h3>Real-time Comments</h3>
                        <p>Collaborate with your team through comments. Keep all communication in one place.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Status Tracking</h3>
                        <p>Track ticket progress from Open to In Progress to Resolved. Never lose sight of issues.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to streamline your support?</h2>
                <p>Start managing your tickets today</p>
                <Link to="/tickets" className="btn btn-hero-primary">
                    View All Tickets
                </Link>
            </section>
        </div>
    );
}

export default Home;
