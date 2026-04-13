import React, { useEffect, useRef, useState } from 'react';
import { SPATIAL_LABELS } from '../constants/labels';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Layer from '@arcgis/core/layers/Layer';
import '@arcgis/core/assets/esri/themes/light/main.css';

const SpatialMap = () => {
    const mapDiv = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLegend, setShowLegend] = useState(true);

    useEffect(() => {
        let view;

        if (mapDiv.current) {
            // Initialize a base Map
            const map = new Map({
                basemap: "satellite"
            });

            // Initialize MapView
            view = new MapView({
                container: mapDiv.current,
                map: map,
            });

            // Add the specific Layer using fromPortalItem to infer layer type automatically
            Layer.fromPortalItem({
                portalItem: {
                    id: "c2c066d3eb8e456ea995e533a0d2b4ae"
                }
            }).then((layer) => {
                map.add(layer);
                layer.when(() => {
                    view.goTo(layer.fullExtent);
                });
            }).catch(err => {
                console.error("Failed to load map layer:", err);
            });

            // Remove all default ArcGIS UI components
            view.ui.components = [];

            // Listen for when the map finishes its initial draw
            view.when(() => {
                setIsLoading(false);
            });
        }

        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    const legendItems = [
        { label: "Background", color: "#F03B20" },
        { label: "Forest", color: "#E8B2EF" },
        { label: "Developed/Barren", color: "#F3B2A9" },
        { label: "Open Water", color: "#BFE1F4" },
        { label: "Winter Wheat", color: "#F6F1D5" },
        { label: "Alfalfa", color: "#F2D0EB" },
        { label: "Others", color: "#7E7E7E" }
    ];

    return (
        <div className="spatial-map-container bg-white h-full flex flex-col rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="p-6 flex justify-between items-center bg-white border-b border-gray-100" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', margin: 0 }}>Spatial Analysis</h3>
                    <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', margin: '4px 0 0 0' }}>Live Vegetation and Crop Coverage Overlay</p>
                </div>
                <button 
                    onClick={() => setShowLegend(!showLegend)}
                    className="bg-white text-gray-700 px-4 py-2 font-medium text-sm shadow-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ backgroundColor: '#ffffff', color: '#374151', padding: '8px 16px', fontWeight: 500, fontSize: '0.875rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}
                >
                    {showLegend ? 'Hide Legend' : 'Show Legend'}
                </button>
            </div>

            <div className="p-4 flex-1 flex flex-col bg-gray-50/50" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                <div className="flex-1 relative overflow-hidden rounded-lg border border-gray-300 shadow-inner" style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '0.5rem', border: '1px solid #d1d5db', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
                    
                    {/* CSS Spinner Loader */}
                    {isLoading && (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 10
                        }}>
                            <div className="arcgis-loader" style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid #e5e7eb',
                                borderTop: '3px solid #3b82f6',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }}></div>
                            <style>
                                {`
                                    @keyframes spin {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }
                                `}
                            </style>
                        </div>
                    )}

                    {/* SDK Native MapView Container */}
                    <div 
                        ref={mapDiv}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            outline: 'none',
                            opacity: isLoading ? 0 : 1,
                            transition: 'opacity 0.3s ease-in'
                        }}
                    ></div>

                    {/* Legend */}
                    {showLegend && (
                        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-5 z-10 max-w-sm" style={{ position: 'absolute', bottom: '24px', right: '24px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb', padding: '20px', zIndex: 10, maxWidth: '24rem' }}>
                            <span className="text-sm font-semibold text-gray-900 mb-3 block" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', marginBottom: '12px', display: 'block' }}>Crop Type Classification</span>
                            <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {legendItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '16px', height: '16px', backgroundColor: item.color, borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }} />
                                        <span className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpatialMap;
