import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

import MetricCard from '../components/MetricCard';
import YieldGraph from '../components/YieldGraph';
import SpatialMap from '../components/SpatialMap';
import RecommendationCard from '../components/RecommendationCard';
import { fetchYieldResults, fetchIdentifiedCrops } from '../api/yieldApi';
import { exportYieldResultsPdf } from '../utils/exportPdf';
import { PAGE_TITLES, BUTTON_LABELS } from '../constants/strings';
import { METRIC_LABELS, RECOMMENDATION_LABELS } from '../constants/labels';

const YieldResults = () => {
    let { sectorId } = useParams();
    if (!sectorId) sectorId = "A-12";

    const [cropList, setCropList] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const crops = await fetchIdentifiedCrops();
                setCropList(crops);
            } catch (error) {
                console.error("Failed to fetch identified crops:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleCropSelect = async (cropName) => {
        setSelectedCrop(cropName);
        setDetailLoading(true);
        try {
            const result = await fetchYieldResults(cropName, sectorId);
            setData(result);
        } catch (error) {
            console.error("Failed to fetch yield results for crop:", error);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedCrop(null);
        setData(null);
    };

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
                    <span className="font-black text-xl uppercase italic">IDENTIFYING CROPS...</span>
                </div>
            </div>
        );
    }

    // Step 1: Show Crop List
    if (!selectedCrop) {
        return (
            <div className="yield-results-container h-full overflow-y-auto bg-[#f9fafb] font-sans">
                <main className="p-12">
                    <div className="mb-12">
                        <div className="flex gap-2 text-[12px] font-black text-gray-400 uppercase mb-4">
                            <span>ROOT</span>
                            <span className="text-gray-300">&raquo;</span>
                            <span>ANALYSIS</span>
                            <span className="text-gray-300">&raquo;</span>
                            <span className="text-black">IDENTIFIED CROPS</span>
                        </div>
                        <h1 className="text-8xl font-black text-black leading-none uppercase tracking-tighter" style={{ fontSize: '100px', letterSpacing: '-0.07em' }}>
                            IDENTIFIED CROPS
                        </h1>
                        <p className="text-sm font-black text-gray-500 uppercase mt-4">
                            SELECT A CROP TO VIEW DETAILED ANALYSIS
                        </p>
                        {/* Industrial Separator */}
                        <div className="h-4 bg-black mt-8" />
                        <div className="h-1 bg-gray-200 mt-2" />
                    </div>

                    <div className="crop-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cropList && Object.values(cropList).map((crop, index, array) => (
                            <React.Fragment key={crop.cropName}>
                                <div
                                    onClick={() => handleCropSelect(crop.cropName)}
                                    className="group cursor-pointer transition-all"
                                    style={{ cursor: 'pointer', padding: '16px 0' }}
                                >
                                    <div style={{ marginBottom: '16px' }}>
                                        <h2 className="text-4xl font-black uppercase leading-[1.1] tracking-tighter" style={{ fontSize: '32px', fontWeight: 900, marginBottom: '4px' }}>{crop.cropName}</h2>
                                    </div>

                                    <div className="space-y-3" style={{ marginBottom: '16px' }}>
                                        <div className="flex justify-between text-xs font-black uppercase" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ color: '#9ca3af' }}>TOTAL AREA</span>
                                            <span style={{ color: 'black' }}>{crop.totalArea.toLocaleString()} SQM</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-black uppercase" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#9ca3af' }}>ZONE STATUS</span>
                                            <span style={{ color: '#16a34a' }}>OPTIMAL</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase" style={{ backgroundColor: 'black', color: 'white', padding: '4px 12px', fontSize: '10px', fontWeight: 900 }}>
                                            STATUS: READY
                                        </div>
                                        <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                                {index < array.length - 1 && (
                                    <div key={`sep-${index}`} style={{ height: '4px', backgroundColor: 'black', margin: '24px 0' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Step 2: Show Detailed Results for Selected Crop
    if (detailLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <span className="font-black text-xl uppercase italic">LOADING {selectedCrop.toUpperCase()} DATA...</span>
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
                        <button onClick={handleBackToList} className="hover:text-black flex items-center gap-1">
                            <ArrowLeft size={12} /> BACK TO LIST
                        </button>
                        <span className="text-gray-300">|</span>
                        <span>ROOT</span>
                        <span className="text-gray-300">&raquo;</span>
                        <span>ANALYSIS</span>
                        <span className="text-gray-300">&raquo;</span>
                        <span className="text-black" style={{ color: 'black' }}>{selectedCrop.toUpperCase()} RESULTS</span>
                    </div>

                    <div className="flex justify-between items-end" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1 className="text-8xl font-black text-black leading-none uppercase tracking-tighter" style={{ fontSize: '100px', fontWeight: 900, color: 'black', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.07em' }}>
                                {selectedCrop.toUpperCase()}
                            </h1>
                            <p className="text-sm font-black text-gray-500 uppercase mt-4" style={{ fontSize: '14px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', marginTop: '16px' }}>
                                SECTOR {data.sectorId} • IDENTIFIED VARIETY • AREA {cropList[selectedCrop]?.totalArea.toLocaleString()} SQM
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
                        subtitle={data.variety}
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
