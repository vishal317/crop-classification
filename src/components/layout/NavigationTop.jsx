import React from 'react';
import { Menu, Image, Search } from 'lucide-react';
import './NavigationTop.css';

const NavigationTop = ({ onToggleSidebar }) => {
    return (
        <nav className="navigation-top">
            <div className="nav-top-left">
                <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                    <Menu size={24} strokeWidth={3} />
                </button>
                <a href="/" className="brand-lofi">
                    <span className="brand-icon">
                        <Image size={24} strokeWidth={3} />
                    </span>
                    <span className="brand-text">AGRIWIREFRAME</span>
                </a>
                <div className="nav-links">
                    <a href="#" className="nav-link">DASHBOARD</a>
                    <a href="#" className="nav-link active">ANALYSIS</a>
                    <a href="#" className="nav-link">ORDERS</a>
                    <a href="#" className="nav-link">HISTORY</a>
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
