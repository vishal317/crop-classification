import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, AlertTriangle, ShoppingCart, Settings } from 'lucide-react';
import './NavigationSidebar.css';

const NavigationSidebar = ({ isOpen, onClose }) => {
    const [isAnalysisComplete, setIsAnalysisComplete] = useState(localStorage.getItem('analysisComplete') === 'true');

    useEffect(() => {
        const checkStatus = () => setIsAnalysisComplete(localStorage.getItem('analysisComplete') === 'true');
        window.addEventListener('storage', checkStatus);
        window.addEventListener('analysis-complete', checkStatus);
        return () => {
            window.removeEventListener('storage', checkStatus);
            window.removeEventListener('analysis-complete', checkStatus);
        };
    }, []);
    return (
        <aside className={`navigation-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="project-info">
                    <div className="project-name">PROJECT ALPHA</div>
                    <div className="project-id">ID: 10293</div>
                </div>
            </div>

            <nav className="sidebar-menu">
                <NavLink 
                    to="/result" 
                    className={({ isActive }) => `menu-item ${isActive || window.location.pathname.includes('/result') ? 'active' : ''}`}
                >
                    <span className="menu-icon">
                        <LayoutGrid size={16} strokeWidth={2} />
                    </span>
                    Dashboard
                </NavLink>
                {/* <NavLink 
                    to="/analysis" 
                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                >
                    <span className="menu-icon">
                        <LayoutGrid size={16} strokeWidth={2} />
                    </span>
                    Upload Image
                </NavLink> */}
                <NavLink 
                    to="/stress-management" 
                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                        if (!isAnalysisComplete) {
                            e.preventDefault();
                            alert("Locked: Please upload all 18 .tif files and complete the analysis flow first!");
                        }
                    }}
                    style={{
                        opacity: isAnalysisComplete ? 1 : 0.4,
                        pointerEvents: isAnalysisComplete ? 'auto' : 'none'
                    }}
                >
                    <span className="menu-icon">
                        <AlertTriangle size={16} strokeWidth={2} />
                    </span>
                    Stress Mgmt
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
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
