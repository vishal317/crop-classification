import React, { useState, useEffect } from 'react';
import './StressManagement.css'; // Import explicit CSS
import {
    stressZones as mockZones,
    stressLogs as mockLogs,
    warehouses as mockWarehouses,
    treatments as mockTreatments,
    scannerStatus as mockScanner
} from './mockData';

import FieldStressMap from './components/FieldStressMap';
import StressLogs from './components/StressLogs';
import WarehouseProximity from './components/WarehouseProximity';
import TreatmentStack from './components/TreatmentStack';
import ScannerStatus from './components/ScannerStatus';

const StressManagementPage = () => {
    const [zones, setZones] = useState([]);
    const [logs, setLogs] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [scanner, setScanner] = useState(null);

    useEffect(() => {
        setZones(mockZones);
        setLogs(mockLogs);
        setWarehouses(mockWarehouses);
        setTreatments(mockTreatments);
        setScanner(mockScanner);
    }, []);

    return (
        <div className="sm-page">

            {/* Page Header */}
            <div className="sm-header">
                <div>
                    <div className="sm-breadcrumbs">
                        <span>HOME</span>
                        <span>{'>'}</span>
                        <span className="active">STRESS MANAGEMENT</span>
                    </div>
                    <h1>STRESS DETECTION SUMMARY</h1>
                    <p>
                        LOW-FIDELITY WIREFRAME: ZONE A-12 / MODULE V.4
                    </p>
                </div>
                <div>
                    <button className="sm-btn">
                        EXPORT DATA
                    </button>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="sm-layout">

                {/* LEFT SECTION (70%) */}
                <div className="sm-left">
                    <FieldStressMap zones={zones} />
                    <StressLogs logs={logs} />
                    <WarehouseProximity warehouses={warehouses} />
                </div>

                {/* RIGHT SECTION (30%) */}
                <div className="sm-right">
                    <TreatmentStack treatments={treatments} />
                    <ScannerStatus status={scanner} />
                </div>

            </div>
        </div>
    );
};

export default StressManagementPage;
