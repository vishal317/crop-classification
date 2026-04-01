import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, AlertTriangle, ShoppingCart, Settings } from 'lucide-react';
import './NavigationSidebar.css';

const NavigationSidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`navigation-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="project-info">
                    <div className="project-name">PROJECT ALPHA</div>
                    <div className="project-id">ID: 10293</div>
                </div>
            </div>

            <nav className="sidebar-menu">
                <NavLink to="/analysis" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <span className="menu-icon">
                        <LayoutGrid size={16} strokeWidth={2} />
                    </span>
                    Crop Analysis
                </NavLink>
                <NavLink to="/stress-management" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <span className="menu-icon">
                        <AlertTriangle size={16} strokeWidth={2} />
                    </span>
                    Stress Mgmt
                </NavLink>
                <NavLink to="/result" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <span className="menu-icon">
                        <ShoppingCart size={16} strokeWidth={2} />
                    </span>
                    Orders
                </NavLink>
                <a href="#" className="menu-item">
                    <span className="menu-icon">
                        <Settings size={16} strokeWidth={2} />
                    </span>
                    Settings
                </a>
            </nav>

            <div className="sidebar-footer">
                <div className="usage-limit">
                    <span className="usage-label">Usage Limit</span>
                    <div className="usage-bar-container">
                        <div className="usage-bar-fill" style={{ width: '65%' }}></div>
                    </div>
                    <div className="usage-text">13 / 20 TOTAL</div>
                </div>
            </div>
        </aside>
    );
};

export default NavigationSidebar;
