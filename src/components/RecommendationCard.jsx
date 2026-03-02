import React from 'react';
import * as LucideIcons from 'lucide-react';

const RecommendationCard = ({ title, description, icon, highlighted }) => {
    const Icon = LucideIcons[icon] || LucideIcons.Info;

    return (
        <div className={`recommendation-card border-8 border-black p-8 h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${highlighted ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ border: '8px solid black', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: highlighted ? 'black' : 'white', color: highlighted ? 'white' : 'black', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
            <div className={`w-14 h-14 border-4 border-black flex items-center justify-center mb-8 self-start ${highlighted ? 'bg-white' : 'bg-white'}`} style={{ width: '56px', height: '56px', border: '4px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', alignSelf: 'flex-start', backgroundColor: 'white' }}>
                <Icon className="text-black" size={28} strokeWidth={4} style={{ color: 'black' }} />
            </div>

            <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '-0.05em' }}>{title}</h4>
            <p className={`text-sm font-black leading-relaxed ${highlighted ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontSize: '14px', fontWeight: 900, lineHeight: 1.5, color: highlighted ? '#d1d5db' : '#4b5563' }}>
                {description}
            </p>
        </div>
    );
};

export default RecommendationCard;
