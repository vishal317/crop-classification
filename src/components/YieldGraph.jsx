import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Legend } from 'recharts';
import { CHART_LABELS } from '../constants/labels';
import { BUTTON_LABELS } from '../constants/strings';

const YieldGraph = ({ data, targetThreshold }) => {
    const chartData = useMemo(() => data.map(item => ({
        ...item,
        displayValue: item.value
    })), [data]);

    const getBarFill = (type) => {
        switch (type) {
            case 'peak': return '#000000';
            case 'optimal': return '#333333';
            case 'early': return 'url(#pattern-diagonal-early)';
            case 'late': return 'url(#pattern-diagonal-late)';
            default: return '#000000';
        }
    };

    return (
        <div className="yield-graph-container border-4 border-black p-6 bg-white h-full" style={{ border: '4px solid black', padding: '24px', backgroundColor: 'white', height: '100%' }}>
            <div className="flex justify-between items-start mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h3 className="text-2xl font-black text-black uppercase" style={{ fontSize: '24px', fontWeight: 900, color: 'black', textTransform: 'uppercase' }}>{CHART_LABELS.TITLE}</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase" style={{ fontSize: '12px', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>{CHART_LABELS.SUBTITLE}</p>
                </div>
                <div className="flex bg-black p-1 gap-1" style={{ display: 'flex', backgroundColor: 'black', padding: '4px', gap: '4px' }}>
                    <button className="px-4 py-1 text-xs font-black bg-white text-black" style={{ padding: '4px 16px', fontSize: '12px', fontWeight: 900, backgroundColor: 'white', color: 'black' }}>{BUTTON_LABELS.WEEKLY}</button>
                    <button className="px-4 py-1 text-xs font-black text-white hover:bg-gray-800 transition-colors uppercase opacity-50 cursor-not-allowed" style={{ padding: '4px 16px', fontSize: '12px', fontWeight: 900, color: 'white', textTransform: 'uppercase', opacity: 0.5, cursor: 'not-allowed' }}>{BUTTON_LABELS.DAILY}</button>
                </div>
            </div>

            <div className="h-[400px] w-full mt-12" style={{ height: '400px', width: '100%', marginTop: '48px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 40, right: 100, left: 0, bottom: 40 }}>
                        <defs>
                            <pattern id="pattern-diagonal-early" patternUnits="userSpaceOnUse" width="10" height="10">
                                <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#000" strokeWidth="2" />
                            </pattern>
                            <pattern id="pattern-diagonal-late" patternUnits="userSpaceOnUse" width="12" height="12">
                                <path d="M-1,1 l2,-2 M0,12 l12,-12 M11,13 l2,-2" stroke="#000" strokeWidth="1" strokeDasharray="2,2" />
                            </pattern>
                        </defs>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#000" strokeWidth={1} />
                        <XAxis
                            dataKey="week"
                            axisLine={{ stroke: '#000', strokeWidth: 4 }}
                            tickLine={{ stroke: '#000', strokeWidth: 4 }}
                            tick={{ fontSize: 12, fontWeight: 900, fill: '#000' }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={{ stroke: '#000', strokeWidth: 4 }}
                            tickLine={{ stroke: '#000', strokeWidth: 4 }}
                            tick={{ fontSize: 12, fontWeight: 900, fill: '#000' }}
                            tickFormatter={(val) => `${val.toFixed(1)}k`}
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            contentStyle={{ border: '4px solid black', borderRadius: '0', fontWeight: '900', textTransform: 'uppercase' }}
                        />
                        <ReferenceLine
                            y={targetThreshold}
                            stroke="#000"
                            strokeDasharray="8 8"
                            strokeWidth={4}
                            label={{
                                position: 'right',
                                value: CHART_LABELS.TARGET_THRESHOLD,
                                fill: '#000',
                                fontSize: 12,
                                fontWeight: 900,
                                dy: -20,
                                dx: 10
                            }}
                        />
                        <Bar dataKey="value" barSize={80}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarFill(entry.type)}
                                    stroke="#000"
                                    strokeWidth={4}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex gap-10 mt-10 pt-8 border-t-4 border-black border-dashed" style={{ display: 'flex', gap: '40px', marginTop: '40px', paddingTop: '32px', borderTop: '4px dashed black' }}>
                <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="w-4 h-4 bg-black" style={{ width: '16px', height: '16px', backgroundColor: 'black' }} />
                    <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{CHART_LABELS.OPTIMAL}</span>
                </div>
                <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="w-4 h-4 border-4 border-black bg-white relative overflow-hidden" style={{ width: '16px', height: '16px', border: '4px solid black', backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div className="absolute inset-0" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 50%)', backgroundSize: '6px 6px' }} />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{CHART_LABELS.EARLY}</span>
                </div>
                <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="w-4 h-4 border-4 border-black bg-white relative overflow-hidden" style={{ width: '16px', height: '16px', border: '4px solid black', backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div className="absolute inset-0 opacity-50" style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '4px 4px' }} />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{CHART_LABELS.LATE}</span>
                </div>
                <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="w-10 border-b-4 border-black border-dashed" style={{ width: '40px', borderBottom: '4px dashed black' }} />
                    <span className="text-[12px] font-black uppercase tracking-tighter" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>{CHART_LABELS.TARGET_LINE}</span>
                </div>
            </div>
        </div>
    );
};

export default YieldGraph;
