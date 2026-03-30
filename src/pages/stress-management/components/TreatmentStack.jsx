import React from 'react';
import LoFiCard from './common/LoFiCard';
import LoFiBadge from './common/LoFiBadge';

const TreatmentStack = ({ treatments = [] }) => {
    return (
        <LoFiCard
            title={
                <>
                    <div className="sm-icon-placeholder">
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'black', marginTop: '4px' }}></div>
                        <div style={{ width: '2px', height: '100%', backgroundColor: 'black', position: 'absolute' }}></div>
                    </div>
                    TREATMENT STACK
                </>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {treatments.map((cat, idx) => (
                    <div key={idx}>
                        <div className="sm-treatment-cat">
                            {cat.category}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cat.items.map(item => (
                                <div key={item.id} className="sm-treatment-item">
                                    <div className="sm-treatment-header">
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{item.name}</h4>
                                            <span style={{ fontSize: '0.625rem', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                TARGET: {item.target}
                                            </span>
                                        </div>
                                        <LoFiBadge text={item.status} variant={item.status === 'CRITICAL' ? 'critical' : 'outline'} />
                                    </div>

                                    <div className="sm-treatment-price-row">
                                        <div style={{ fontSize: '1.125rem', fontWeight: 900 }}>{item.price}</div>
                                        <button className="sm-add-btn">
                                            <span style={{ transform: 'translateY(-2px)' }}>+</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid black' }}>
                <button className="sm-btn-black">
                    BULK ORDER SELECTED
                </button>
            </div>
        </LoFiCard>
    );
};

export default TreatmentStack;
