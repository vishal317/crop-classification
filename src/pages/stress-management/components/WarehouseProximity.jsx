import React from 'react';
import LoFiCard from './common/LoFiCard';
import LoFiBadge from './common/LoFiBadge';

const WarehouseProximity = ({ warehouses = [] }) => {
    return (
        <LoFiCard
            title={
                <>
                    <div className="sm-icon-placeholder">
                        <div style={{ width: '8px', height: '8px', borderTop: '2px solid black', borderRight: '2px solid black', transform: 'translateY(-1px)' }}></div>
                    </div>
                    WAREHOUSE PROXIMITY
                </>
            }
        >
            <div className="sm-warehouse-layout">

                {/* Mini Map Placeholder */}
                <div className="sm-wh-map">
                    {/* User Land marker */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: 'white', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}>
                            <div style={{ width: '12px', height: '12px', backgroundColor: 'black', transform: 'rotate(45deg)' }}></div>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'white', padding: '0 4px' }}>YOUR LAND</div>
                    </div>

                    {/* Warehouses */}
                    {warehouses.map(wh => (
                        <div
                            key={wh.id}
                            style={{
                                position: 'absolute', left: `${wh.coordinates.x}%`, top: `${wh.coordinates.y}%`, transform: 'translate(-50%, -50%)',
                                width: '40px', height: '32px', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.75rem', fontWeight: 900, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                                backgroundColor: wh.stockLevel === 'high' ? 'black' : 'white',
                                color: wh.stockLevel === 'high' ? 'white' : 'black',
                                zIndex: wh.stockLevel === 'high' ? 10 : 1
                            }}
                        >
                            {wh.id}
                        </div>
                    ))}
                </div>

                {/* Logistics List */}
                <div className="sm-wh-list">
                    <div>
                        <div className="sm-wh-header">
                            <span style={{ width: '50%' }}>WAREHOUSE</span>
                            <span style={{ width: '25%', textAlign: 'center' }}>DIST.</span>
                            <span style={{ width: '25%', textAlign: 'right' }}>STOCK</span>
                        </div>

                        <div>
                            {warehouses.map((wh) => (
                                <div key={wh.id} className="sm-wh-row">
                                    <span style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', width: '50%', color: 'black' }}>{wh.name}</span>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', width: '25%', textAlign: 'center', color: '#4b5563' }}>{wh.distance}</span>
                                    <div style={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <LoFiBadge
                                            text={wh.stock}
                                            variant={wh.stockLevel === 'high' ? 'black' : wh.stockLevel === 'none' ? 'transparent' : 'outline'}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <p style={{ fontSize: '0.625rem', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>
                            * DELIVERY TO ZONE A-12 ESTIMATED 12-24H *
                        </p>
                        <button className="sm-btn" style={{ width: '100%' }}>
                            VIEW LOGISTICS MAP
                        </button>
                    </div>
                </div>

            </div>
        </LoFiCard>
    );
};

export default WarehouseProximity;
