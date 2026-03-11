import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Search } from 'lucide-react';
import './NavigationTop.css';

const NavigationTop = ({ onToggleSidebar }) => {
    return (
        <nav className="navigation-top">
            <div className="nav-top-left">
                <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                    <Menu size={24} strokeWidth={3} />
                </button>
                <Link to="/" className="brand-lofi">
                    <span className="brand-icon">
                        <Image size={24} strokeWidth={3} />
                    </span>
                    <span className="brand-text">AGRIWIREFRAME</span>
                </Link>
                <div className="nav-links">
                    <Link to="/analysis" className="nav-link">DASHBOARD</Link>
                    <Link to="/analysis" className="nav-link active">ANALYSIS</Link>
                    <Link to="/result" className="nav-link">ORDERS</Link>
                    <Link to="/progress" className="nav-link">HISTORY</Link>
                </div>
            </div>
            <div className="nav-top-right">
                <div className="search-box">
                    <span className="search-icon">
                        <Search size={16} strokeWidth={3} />
                    </span>
                    <input type="text" className="search-input" placeholder="SEARCH FARMS..." />
                </div>
                <div className="profile-box">U</div>
            </div>
        </nav>
    );
};

export default NavigationTop;
