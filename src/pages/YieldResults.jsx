import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import MetricCard from '../components/MetricCard';
import YieldGraph from '../components/YieldGraph';
import SpatialMap from '../components/SpatialMap';
import RecommendationCard from '../components/RecommendationCard';
import { fetchYieldResults } from '../api/yieldApi';
import { exportYieldResultsPdf } from '../utils/exportPdf';
import { PAGE_TITLES, BUTTON_LABELS } from '../constants/strings';
import { METRIC_LABELS, RECOMMENDATION_LABELS } from '../constants/labels';

const YieldResults = () => {
    let { sectorId } = useParams();
    if (!sectorId) sectorId = "A-12";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchYieldResults(sectorId);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch yield results:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [sectorId]);

    const memoizedYieldData = useMemo(() => data?.weeklyYield || [], [data]);

    const handleExportPdf = () => {
        if (data) {
            exportYieldResultsPdf(data, 'yield-results-content');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <span className="font-black text-xl uppercase italic">ANALYZING SPATIAL DATA...</span>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="yield-results-container h-full overflow-y-auto" style={{ height: '100%', overflowY: 'auto', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
            <main className="p-12" id="yield-results-content" style={{ padding: '48px' }}>
                {/* Breadcrumbs & Header */}
                <div className="mb-12" style={{ marginBottom: '48px' }}>
                    <div className="flex gap-2 text-[12px] font-black text-gray-400 uppercase mb-4" style={{ display: 'flex', gap: '8px', fontSize: '12px', fontWeight: 900, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
                        <span>ROOT</span>
                        <span className="text-gray-300">&raquo;</span>
                        <span>ANALYSIS</span>
                        <span className="text-gray-300">&raquo;</span>
                        <span className="text-black" style={{ color: 'black' }}>YIELD PLANNING</span>
                    </div>

                    <div className="flex justify-between items-end" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1 className="text-8xl font-black text-black leading-none uppercase tracking-tighter" style={{ fontSize: '100px', fontWeight: 900, color: 'black', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.07em' }}>
                                {PAGE_TITLES.YIELD_RESULTS}
                            </h1>
                            <p className="text-sm font-black text-gray-500 uppercase mt-4" style={{ fontSize: '14px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', marginTop: '16px' }}>
                                SECTOR {data.sectorId} • VARIANT 03/10 • GRAYSCALE WIREFRAME
                            </p>
                        </div>
                        <div className="flex gap-6 pb-2" style={{ display: 'flex', gap: '24px', paddingBottom: '8px' }}>
                            <button className="px-10 py-4 border-4 border-black bg-white font-black text-sm hover:bg-gray-50 transition-colors uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ padding: '16px 40px', border: '4px solid black', backgroundColor: 'white', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
                                {BUTTON_LABELS.SHARE}
                            </button>
                            <button
                                onClick={handleExportPdf}
                                className="px-10 py-4 bg-black text-white font-black text-sm hover:bg-gray-800 transition-colors uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                                style={{ padding: '16px 40px', backgroundColor: 'black', color: 'white', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)', border: 'none', cursor: 'pointer' }}
                            >
                                {BUTTON_LABELS.EXPORT_PDF}
                            </button>
                        </div>
                    </div>
                    <div className="h-4 bg-black mt-8" style={{ height: '16px', backgroundColor: 'black', marginTop: '32px' }} />
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px' }}>
                    <MetricCard
                        title={METRIC_LABELS.DETECTED_CROP}
                        value={data.crop}
                        subtitle={`HYBRID VARIETY ${data.variety}`}
                        variant="crop"
                    />
                    <MetricCard
                        title={METRIC_LABELS.CURRENT_HEALTH}
                        value={`${data.health}%`}
                        delta={data.healthDelta}
                        progress={data.health}
                        variant="health"
                        subtitle="PREDICTED VS PREVIOUS CYCLE"
                    />
                    <MetricCard
                        title={METRIC_LABELS.YIELD_GAP}
                        value={`${data.yieldGap}%`}
                        variant="gap"
                        subtitle={METRIC_LABELS.PREDICTED_VS_TARGET}
                    />
                    <MetricCard
                        title={METRIC_LABELS.YIELD_QUANTITY}
                        value={`${data.yieldQuantity.predicted}k`}
                        chartData={data.yieldQuantity}
                        subtitle={METRIC_LABELS.METRIC_SEASON}
                        variant="quantity"
                    />
                </div>

                {/* Graph & Map Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', marginBottom: '48px' }}>
                    <div className="lg:col-span-2" style={{ gridColumn: 'span 8' }}>
                        <YieldGraph
                            data={memoizedYieldData}
                            targetThreshold={data.targetThreshold}
                        />
                    </div>
                    <div className="lg:col-span-1" style={{ gridColumn: 'span 4' }}>
                        <SpatialMap />
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mb-12" style={{ marginTop: '48px' }}>
                    <h3 className="text-5xl font-black text-black uppercase mb-12 underline decoration-[12px] underline-offset-[16px] decoration-black/10" style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '64px', textDecoration: 'underline', textDecorationThickness: '12px', textUnderlineOffset: '16px', textDecorationColor: 'rgba(0,0,0,0.1)', letterSpacing: '-0.07em' }}>
                        {RECOMMENDATION_LABELS.TITLE}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
                        {data.recommendations.map((rec, index) => (
                            <RecommendationCard
                                key={index}
                                title={rec.title}
                                description={rec.description}
                                icon={rec.icon}
                                highlighted={rec.highlighted}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default YieldResults;
