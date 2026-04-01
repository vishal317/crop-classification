import React from 'react';
import LoFiCard from './common/LoFiCard';

const StressLogs = ({ logs = [] }) => {
    return (
        <LoFiCard noPadding>
            <div className="sm-card-header">
                <h3>DETECTED STRESS LOGS</h3>
            </div>
            <div>
                <table className="sm-table">
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td style={{ width: '25%' }}>ID: {log.id}</td>
                                <td style={{ width: '50%' }}>TYPE: {log.type}</td>
                                <td style={{ width: '25%', textAlign: 'right' }}>INTENSITY: {log.intensity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LoFiCard>
    );
};

export default StressLogs;
