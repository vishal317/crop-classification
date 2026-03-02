import React from 'react';
import { SPATIAL_LABELS } from '../constants/labels';

const SpatialMap = () => {
    return (
        <div className="spatial-map-container border-8 border-black bg-white h-full flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ border: '8px solid black', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
            <div className="p-8" style={{ padding: '32px' }}>
                <h3 className="text-4xl font-black text-black uppercase tracking-tighter" style={{ fontSize: '40px', fontWeight: 900, color: 'black', textTransform: 'uppercase', letterSpacing: '-0.05em' }}>{SPATIAL_LABELS.TITLE}</h3>
                <p className="text-[14px] font-black text-gray-500 uppercase mt-2 tracking-widest" style={{ fontSize: '14px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', marginTop: '8px' }}>{SPATIAL_LABELS.SUBTITLE}</p>
            </div>

            <div className="flex-1 bg-gray-200 relative overflow-hidden m-2 border-t-8 border-black" style={{ flex: 1, backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden', margin: '8px', borderTop: '8px solid black' }}>
                {/* Mock Map Texture */}
                <div className="absolute inset-0 opacity-30" style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '6px 6px' }} />

                {/* Focus Zone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-8 border-black border-dashed rounded-full flex items-center justify-center bg-white/40 backdrop-blur-md" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '256px', height: '256px', border: '8px dashed black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)' }}>
                    <div className="bg-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[14px] font-black uppercase tracking-widest">{SPATIAL_LABELS.FOCUS_ZONE}</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-8 left-8 right-8 bg-white border-8 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', backgroundColor: 'white', border: '8px solid black', padding: '24px', boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)' }}>
                    <span className="text-[14px] font-black text-black uppercase mb-4 block tracking-widest" style={{ fontSize: '14px', fontWeight: 900, color: 'black', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>{SPATIAL_LABELS.VARIATION_KEY}</span>
                    <div className="flex gap-12" style={{ display: 'flex', gap: '48px' }}>
                        <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="w-5 h-5 bg-black" style={{ width: '20px', height: '20px', backgroundColor: 'black' }} />
                            <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{SPATIAL_LABELS.HIGH}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="w-5 h-5 bg-gray-400 border-2 border-black" style={{ width: '20px', height: '20px', backgroundColor: '#9ca3af', border: '2px solid black' }} />
                            <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{SPATIAL_LABELS.MED}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="w-5 h-5 border-4 border-black bg-white" style={{ width: '20px', height: '20px', border: '4px solid black', backgroundColor: 'white' }} />
                            <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{SPATIAL_LABELS.LOW}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpatialMap;
