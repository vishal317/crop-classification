import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Info, Leaf, Activity, Target } from 'lucide-react';

const MetricCard = ({ title, value, subtitle, progress, delta, chartData, variant }) => {
    return (
        <div className="metric-card border-8 border-black p-8 bg-white flex flex-col justify-between h-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ border: '8px solid black', padding: '32px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '260px', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
            <div className="flex justify-between items-start mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <span className="text-[12px] font-black uppercase text-gray-400 tracking-widest" style={{ fontSize: '12px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase' }}>{title}</span>
                <div style={{ padding: '8px', border: '4px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {variant === 'crop' && <Leaf className="text-black" size={24} strokeWidth={4} />}
                    {variant === 'health' && <Activity className="text-black" size={24} strokeWidth={4} />}
                    {variant === 'gap' && <Target className="text-black" size={24} strokeWidth={4} />}
                    {variant === 'quantity' && <BarChart3 className="text-black" size={24} strokeWidth={4} />}
                </div>
            </div>

            <div className="flex items-baseline gap-4 mb-4" style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
                <h2 className="text-5xl font-black text-black leading-none tracking-tighter" style={{ fontSize: '56px', fontWeight: 900, color: 'black', letterSpacing: '-0.05em' }}>{value}</h2>
                {delta !== undefined && (
                    <div className="flex items-center bg-white border-4 border-black px-3 py-1 text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '4px solid black', padding: '4px 12px', fontSize: '14px', fontWeight: 900, boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>
                        {delta > 0 ? '+' : ''}{delta}%
                    </div>
                )}
                {variant === 'gap' && <span className="text-xs font-black bg-black text-white px-3 py-1 tracking-widest" style={{ fontSize: '10px', fontWeight: 900, backgroundColor: 'black', color: 'white', padding: '4px 12px' }}>GAP</span>}
            </div>

            <div className="mt-auto" style={{ marginTop: 'auto' }}>
                {progress !== undefined && (
                    <div className="w-full h-10 border-4 border-black bg-gray-100 overflow-hidden mb-6" style={{ width: '100%', height: '40px', border: '4px solid black', backgroundColor: '#f3f4f6', overflow: 'hidden', marginBottom: '24px' }}>
                        <div
                            className="h-full bg-black"
                            style={{ height: '100%', backgroundColor: 'black', width: `${progress}%` }}
                        />
                    </div>
                )}

                {variant === 'quantity' && chartData && (
                    <div className="flex items-end gap-4 h-24 mb-6" style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '96px', marginBottom: '24px' }}>
                        <div className="flex flex-col items-center flex-1 h-full justify-end" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                            <span className="text-[12px] font-black mb-2" style={{ fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>{chartData.target}k</span>
                            <div className="w-full bg-white border-4 border-black border-dashed h-20 relative" style={{ width: '100%', backgroundColor: 'white', border: '4px dashed black', height: '80px', position: 'relative' }}>
                                <div className="absolute inset-0 bg-gray-200 opacity-20" style={{ position: 'absolute', inset: 0, backgroundColor: '#e5e7eb', opacity: 0.2, backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
                            </div>
                            <span className="text-[10px] font-black mt-2 tracking-widest" style={{ fontSize: '10px', fontWeight: 900, marginTop: '8px' }}>TARGET</span>
                        </div>
                        <div className="flex flex-col items-center flex-1 h-full justify-end" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                            <span className="text-[12px] font-black mb-2" style={{ fontSize: '12px', fontWeight: 900, marginBottom: '8px' }}>{chartData.predicted}k</span>
                            <div className="w-full bg-black h-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ width: '100%', backgroundColor: 'black', height: '80px', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }} />
                            <span className="text-[10px] font-black mt-2 tracking-widest" style={{ fontSize: '10px', fontWeight: 900, marginTop: '8px' }}>PREDICTED</span>
                        </div>
                    </div>
                )}

                <div className="border-t-4 border-black border-dashed pt-4" style={{ borderTop: '4px dashed black', paddingTop: '16px' }}>
                    <p className="text-[12px] font-black text-black/60 uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
