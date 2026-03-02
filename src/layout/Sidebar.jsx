import React from 'react';
import { LayoutDashboard, BarChart3, Map as MapIcon, FileText } from 'lucide-react';
import { NAV_LABELS } from '../constants/strings';

const Sidebar = ({ activeTab }) => {
    const navItems = [
        { id: 'overview', label: NAV_LABELS.OVERVIEW, icon: LayoutDashboard },
        { id: 'yield', label: NAV_LABELS.YIELD_RESULTS, icon: BarChart3 },
        { id: 'map', label: NAV_LABELS.FIELD_MAP, icon: MapIcon },
        { id: 'reports', label: NAV_LABELS.REPORTS, icon: FileText },
    ];

    return (
        <aside className="w-52 border-r-2 border-black bg-white flex flex-col h-full overflow-y-auto">
            <div className="px-5 pt-5 pb-2 uppercase text-[10px] font-bold text-gray-400 tracking-[0.2em]">NAVIGATION</div>
            <nav className="flex-1 px-3 mt-3">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center space-x-3 px-4 py-3 cursor-pointer mb-1 transition-all ${item.id === activeTab ? 'bg-black text-white' : 'text-black hover:bg-gray-50'}`}
                    >
                        <item.icon size={16} strokeWidth={item.id === activeTab ? 2.5 : 2} />
                        <span className="text-[12px] font-bold uppercase tracking-tight">{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="px-5 pb-6 pt-4">
                <div className="border-t-2 border-black border-dashed pt-5">
                    <div className="border-2 border-black p-4 bg-white">
                        <span className="text-[11px] font-bold uppercase block mb-3 tracking-tight">SYSTEM STATUS</span>
                        <div className="w-full h-3 bg-gray-100 border-[2px] border-black overflow-hidden mb-2">
                            <div className="h-full bg-black w-[75%]" />
                        </div>
                        <span className="text-[10px] font-bold text-black uppercase tracking-[0.1em]">SATELLITE SYNC: 75%</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
