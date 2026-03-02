import React, { useState } from 'react';
import NavigationTop from './NavigationTop';
import NavigationSidebar from './NavigationSidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`main-layout ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
            <NavigationTop onToggleSidebar={toggleSidebar} />
            <div className="layout-container">
                <NavigationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="content-wrapper">
                    {children}
                </main>
            </div>
            {/* Mobile Overlay */}
            {isSidebarOpen && <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
        </div>
    );
};

export default MainLayout;
