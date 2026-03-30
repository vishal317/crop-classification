import React from 'react';

const ScannerStatus = ({ status }) => {
    return (
        <div className="sm-scanner-card">
            <div className="sm-scanner-row">
                {status?.isActive ? (
                    <div className="sm-pulse"></div>
                ) : (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9ca3af' }}></div>
                )}
                <span>
                    SCANNER {status?.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </div>

            <div className="sm-divider"></div>

            <span style={{ fontSize: '0.625rem', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                NEXT UPDATE IN {status?.nextUpdate || '--:--:--'}
            </span>
        </div>
    );
};

export default ScannerStatus;
