import React from 'react';
import { Menu, Leaf, Search, Bell } from 'lucide-react';
import { NAV_LABELS } from '../constants/strings';

const TopNav = ({ onToggleSidebar }) => {
    return (
        <nav className="h-14 border-b-2 border-black bg-white flex items-center justify-between px-6 sticky top-0 z-50">
            {/* Left/Center Group: Logo & Search */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <button className="lg:hidden" onClick={onToggleSidebar}>
                        <Menu size={20} strokeWidth={2.5} />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 border-2 border-black flex items-center justify-center bg-white">
                            <Leaf size={18} strokeWidth={2.5} fill="black" />
                        </div>
                        <span className="font-black text-sm tracking-tighter uppercase leading-none">AGRITECH WIREFRAME</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center border-2 border-black bg-white px-3 py-1.5 w-64">
                    <Search size={14} strokeWidth={2.5} className="text-black mr-2" />
                    <input
                        type="text"
                        placeholder="SEARCH FIELDS..."
                        className="bg-transparent border-none focus:ring-0 text-xs font-bold placeholder:text-gray-300 w-full outline-none uppercase"
                    />
                </div>
            </div>

            {/* Right Group: Links & Actions */}
            <div className="flex items-center space-x-8">
                <div className="hidden lg:flex items-center space-x-8">
                    <a href="#" className="text-[13px] font-bold uppercase text-black hover:opacity-70 transition-opacity tracking-wider">{NAV_LABELS.DASHBOARD}</a>
                    <a href="#" className="text-[13px] font-bold uppercase text-black pb-0.5 border-b-2 border-black tracking-wider">{NAV_LABELS.ANALYSIS}</a>
                    <a href="#" className="text-[13px] font-bold uppercase text-black hover:opacity-70 transition-opacity tracking-wider">{NAV_LABELS.STRESS}</a>
                    <a href="#" className="text-[13px] font-bold uppercase text-black hover:opacity-70 transition-opacity tracking-wider">{NAV_LABELS.ORDERS}</a>
                </div>

                <div className="flex items-center space-x-3 pl-6 border-l-2 border-black h-8">
                    <button className="w-9 h-9 border-2 border-black flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                        <Bell size={16} strokeWidth={2.5} />
                    </button>
                    <div className="w-9 h-9 border-2 border-black bg-gray-200" />
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
