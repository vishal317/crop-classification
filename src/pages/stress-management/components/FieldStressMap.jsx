import React, { useEffect, useRef, useState } from 'react';
import LoFiCard from './common/LoFiCard';
import { MAP_INTEGRATIONS } from '../../../constants/appConstants';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import '@arcgis/core/assets/esri/themes/light/main.css';

const FieldStressMap = () => {
    const mapDiv = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let view;

        if (mapDiv.current) {
            // Initialize a base Map (satellite usually works best for fields)
            const map = new Map({
                basemap: "satellite"
            });

            // Add the specific FeatureLayer
            const layer = new FeatureLayer({
                portalItem: {
                    id: MAP_INTEGRATIONS.ARCGIS_STRESS_LAYER_ID
                }
            });
            map.add(layer);

            // Initialize MapView
            view = new MapView({
                container: mapDiv.current,
                map: map,
                // WebGL is enabled automatically for modern @arcgis/core MapView layers
            });

            // Center and zoom strictly when the layer loads so we see the data
            layer.when(() => {
                view.goTo(layer.fullExtent);
            });

            // Remove all default ArcGIS UI components (zoom, attribution, navigator, etc.)
            view.ui.components = [];

            // Listen for when the map finishes its initial draw to turn off the loading spinner
            view.when(() => {
                setIsLoading(false);
            });
        }

        // Cleanup the map instance when the component unmounts
        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    return (
        <LoFiCard
            title={
                <>
                    <div className="sm-icon-placeholder">
                        <div style={{ width: '6px', height: '6px', borderTop: '2px solid black', borderLeft: '2px solid black', transform: 'rotate(45deg)' }}></div>
                        <div style={{ width: '6px', height: '6px', borderBottom: '2px solid black', borderRight: '2px solid black', transform: 'rotate(45deg)', position: 'absolute' }}></div>
                    </div>
                    VEGETATION STRESS LAYER
                </>
            }
            // Retained Custom Legend
            headerAction={
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#FF0000', border: '1px solid black' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Severe</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#FFA500', border: '1px solid black' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stress</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#ADFF2F', border: '1px solid black' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Moderate</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', backgroundColor: '#228B22', border: '1px solid black' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Healthy</span>
                    </div>
                </div>
            }
        >
            {/* The Container for the map */}
            <div style={{ height: '400px', width: '100%', position: 'relative', border: '2px solid black', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f9f9f9', zIndex: 0 }}>
                
                {/* CSS Spinner Loader */}
                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f3f4f6',
                        zIndex: 10
                    }}>
                        <div className="arcgis-loader" style={{
                            width: '40px',
                            height: '40px',
                            border: '4px solid #e5e7eb',
                            borderTop: '4px solid #000',
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

            </div>
        </LoFiCard>
    );
};

export default FieldStressMap;
