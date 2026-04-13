import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Filter, Download, Activity, Target, Leaf, Map as MapIcon, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

import MetricCard from '../components/MetricCard';
import YieldGraph from '../components/YieldGraph';
import SpatialMap from '../components/SpatialMap';
import RecommendationCard from '../components/RecommendationCard';
import { fetchYieldResults, fetchIdentifiedCrops } from '../api/yieldApi';
import { exportYieldResultsPdf } from '../utils/exportPdf';
import { BUTTON_LABELS } from '../constants/strings';
import { METRIC_LABELS, RECOMMENDATION_LABELS } from '../constants/labels';
import './YieldResults.css';

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
            <div className="yr-loading">
                <div className="yr-loading-content">
                    <div className="yr-spinner"></div>
                    <span className="yr-loading-text">IDENTIFYING CROPS...</span>
                </div>
            </div>
        );
    }

    // Step 1: Show Crop List (Dashboard Redesign)
    if (!selectedCrop) {
        const cropsArray = cropList ? Object.values(cropList) : [];
        const totalArea = cropsArray.reduce((acc, curr) => acc + curr.totalArea, 0);
        const numTypes = cropsArray.length;
        const dominantCrop = cropsArray.length > 0 ? cropsArray.reduce((prev, current) => (prev.totalArea > current.totalArea) ? prev : current).cropName : "N/A";
        const healthyPct = 85; // Simulated KPI

        const colorMapping = {
            "Forest": "#000000",
            "Developed/Barren": "#404040",
            "Open Water": "#737373",
            "Winter Wheat": "#a3a3a3",
            "Alfalfa": "#d4d4d4",
        };

        const chartData = cropsArray.map(c => ({
            name: c.cropName,
            value: c.totalArea,
            fill: colorMapping[c.cropName] || "#cbd5e1"
        })).sort((a,b) => b.value - a.value);

        return (
            <div className="yr-page-wrapper">
                {/* Header Section */}
                <header className="yr-header">
                    <div>
                        <div className="yr-breadcrumb">
                            <span>Project Alpha</span>
                            <span className="yr-breadcrumb-separator">/</span>
                            <span>Sector Analysis</span>
                        </div>
                        <h1 className="yr-page-title">Crop Classification Dashboard</h1>
                        <p className="yr-page-subtitle">Real-time geospatial intelligence and area distribution</p>
                    </div>
                    <div className="yr-header-actions">
                        <button className="yr-btn yr-btn-outline">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="yr-btn yr-btn-primary">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </header>

                <main className="yr-main-container">
                    {/* KPI Summary Cards */}
                    <div className="yr-kpi-grid">
                        <div className="yr-kpi-card">
                            <div className="yr-kpi-icon-wrapper blue">
                                <MapIcon size={24} />
                            </div>
                            <div className="yr-kpi-content">
                                <p className="yr-kpi-label">Total Analyzed Area</p>
                                <p className="yr-kpi-value">
                                    {(totalArea / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})}k
                                    <span className="yr-kpi-unit">sqm</span>
                                </p>
                            </div>
                        </div>
                        <div className="yr-kpi-card">
                            <div className="yr-kpi-icon-wrapper indigo">
                                <PieChartIcon size={24} />
                            </div>
                            <div className="yr-kpi-content">
                                <p className="yr-kpi-label">Classification Types</p>
                                <p className="yr-kpi-value">
                                    {numTypes}
                                    <span className="yr-kpi-unit">distinct zones</span>
                                </p>
                            </div>
                        </div>
                        <div className="yr-kpi-card">
                            <div className="yr-kpi-icon-wrapper emerald">
                                <Activity size={24} />
                            </div>
                            <div className="yr-kpi-content">
                                <p className="yr-kpi-label">Average Zone Health</p>
                                <p className="yr-kpi-value">
                                    {healthyPct}%
                                    <span className="yr-kpi-trend">↑ 2.4%</span>
                                </p>
                            </div>
                        </div>
                        <div className="yr-kpi-card">
                            <div className="yr-kpi-icon-wrapper amber">
                                <Target size={24} />
                            </div>
                            <div className="yr-kpi-content">
                                <p className="yr-kpi-label">Primary Coverage</p>
                                <p className="yr-kpi-value">{dominantCrop}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Split Content */}
                    <div className="yr-split-grid">
                        {/* Interactive Spatial Map */}
                        <div className="yr-map-panel">
                            <SpatialMap />
                        </div>

                        {/* Crop Distribution Panel */}
                        <div className="yr-distribution-panel">
                            <div className="yr-card yr-card-flex-1">
                                <div className="yr-card-header">
                                    <h3 className="yr-card-title">Area Distribution</h3>
                                    <BarChart3 color="#000000" size={20} />
                                </div>
                                <div className="yr-chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip formatter={(value) => `${value.toLocaleString()} sqm`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Mini legend for chart */}
                                <div className="yr-chart-legend">
                                    {chartData.slice(0, 4).map((c, i) => (
                                        <div key={i} className="yr-legend-item">
                                            <div className="yr-legend-color" style={{ backgroundColor: c.fill }}></div>
                                            <span className="yr-legend-text">{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="yr-card">
                                <div className="yr-card-header">
                                    <h3 className="yr-card-title" style={{fontSize: '0.875rem', color: '#64748b'}}>Top Categories (sqm)</h3>
                                </div>
                                <div className="yr-progress-list">
                                    {chartData.slice(0, 3).map((crop, idx) => (
                                        <div key={idx} className="yr-progress-item">
                                            <div className="yr-progress-header">
                                                <span className="yr-progress-label">{crop.name}</span>
                                                <span className="yr-progress-value">{crop.value.toLocaleString()}</span>
                                            </div>
                                            <div className="yr-progress-bar-bg">
                                                <div className="yr-progress-bar-fill" style={{ width: `${(crop.value / chartData[0].value) * 100}%`, backgroundColor: crop.fill }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Crop Table */}
                    <div className="yr-table-container">
                        <div className="yr-table-header-row">
                            <h3 className="yr-table-title">Detailed Classification Report</h3>
                        </div>
                        <div className="yr-table-wrapper">
                            <table className="yr-table">
                                <thead>
                                    <tr>
                                        <th>Crop Name</th>
                                        <th>Total Area (SQM)</th>
                                        <th>Area Share</th>
                                        <th>Zone Status</th>
                                        <th style={{ textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cropsArray.map((crop, idx) => {
                                        const pct = ((crop.totalArea / totalArea) * 100).toFixed(1);
                                        const color = colorMapping[crop.cropName] || '#94a3b8';
                                        return (
                                            <tr key={idx} className="yr-table-row" onClick={() => handleCropSelect(crop.cropName)}>
                                                <td>
                                                    <div className="yr-crop-name-cell">
                                                        <div className="yr-crop-color-dot" style={{ backgroundColor: color }}></div>
                                                        <span>{crop.cropName}</span>
                                                    </div>
                                                </td>
                                                <td>{crop.totalArea.toLocaleString()}</td>
                                                <td>
                                                    <div className="yr-area-share-container">
                                                        <span className="yr-area-share-text">{pct}%</span>
                                                        <div className="yr-progress-bar-bg">
                                                            <div className="yr-progress-bar-fill" style={{ width: `${pct}%`, backgroundColor: color }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="yr-status-badge">
                                                        <div className="yr-status-dot"></div> Optimal
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="yr-action-btn">
                                                        Analyze <ChevronRight size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Step 2: Show Detailed Results for Selected Crop
    if (detailLoading) {
        return (
            <div className="yr-loading">
                <div className="yr-loading-content">
                    <div className="yr-spinner"></div>
                    <span className="yr-loading-text">LOADING {selectedCrop.toUpperCase()} DATA...</span>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="yr-detail-container">
            <main className="yr-detail-main" id="yield-results-content">
                {/* Breadcrumbs & Header */}
                <div className="yr-detail-header-wrap">
                    <div className="yr-breadcrumb" style={{ marginBottom: '1rem' }}>
                        <button onClick={handleBackToList} style={{ background: 'none', border: 'none', padding: 0, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#000000', textTransform: 'uppercase' }}>
                            <ArrowLeft size={12} /> BACK TO LIST
                        </button>
                        <span className="yr-breadcrumb-separator">|</span>
                        <span>ROOT</span>
                        <span className="yr-breadcrumb-separator">&raquo;</span>
                        <span>ANALYSIS</span>
                        <span className="yr-breadcrumb-separator">&raquo;</span>
                        <span style={{ color: '#000000' }}>{selectedCrop.toUpperCase()} RESULTS</span>
                    </div>

                    <div className="yr-detail-header-flex">
                        <div className="yr-detail-title-block">
                            <h1>{selectedCrop.toUpperCase()}</h1>
                            <p className="yr-detail-subtitle">
                                SECTOR {data.sectorId} • IDENTIFIED VARIETY • AREA {cropList[selectedCrop]?.totalArea.toLocaleString()} SQM
                            </p>
                        </div>
                        <div className="yr-detail-actions">
                            <button className="yr-action-btn-lofi">
                                {BUTTON_LABELS.SHARE}
                            </button>
                            <button onClick={handleExportPdf} className="yr-action-btn-lofi primary">
                                {BUTTON_LABELS.EXPORT_PDF}
                            </button>
                        </div>
                    </div>
                    <div className="yr-detail-divider" />
                </div>

                {/* Metric Cards Grid */}
                <div className="yr-detail-kpi-grid">
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
                <div className="yr-detail-split-grid">
                    <div className="yr-detail-graph-wrap">
                        <YieldGraph
                            data={memoizedYieldData}
                            targetThreshold={data.targetThreshold}
                        />
                    </div>
                    <div className="yr-detail-map-wrap">
                        <SpatialMap />
                    </div>
                </div>

                {/* Recommendations Section */}
                <div style={{ marginTop: '3rem' }}>
                    <h3 className="yr-recommendation-title">
                        {RECOMMENDATION_LABELS.TITLE}
                    </h3>
                    <div className="yr-recommendation-grid">
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
