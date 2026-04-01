export const stressZones = [
    { id: 'ZONE-A12', name: 'ZONE A-12', condition: 'PEST INFESTATION', intensity: 'HIGH', coordinates: { x: 45, y: 35 } },
    { id: 'ZONE-B04', name: 'ZONE B-04', condition: 'WATER STRESS', intensity: 'MODERATE', coordinates: { x: 65, y: 55 } }
];

export const stressLogs = [
    { id: 'STR-001', type: 'PEST INFESTATION', intensity: '88%' },
    { id: 'STR-002', type: 'WATER STRESS', intensity: '45%' },
    { id: 'STR-003', type: 'NUTRIENT DEFICIENCY', intensity: '30%' }
];

export const warehouses = [
    { id: 'WH-1', name: 'WH-1 (Central)', distance: '5km', stock: 'IN STOCK', stockLevel: 'high', coordinates: { x: 60, y: 40 } },
    { id: 'WH-2', name: 'WH-2 (West-09)', distance: '12km', stock: 'LIMITED', stockLevel: 'medium', coordinates: { x: 40, y: 70 } },
    { id: 'WH-3', name: 'WH-3 (North-V)', distance: '20km', stock: 'OUT OF STOCK', stockLevel: 'none', coordinates: { x: 30, y: 30 } }
];

export const treatments = [
    {
        category: 'MINERALS',
        items: [
            { id: 'tm-1', name: 'BIO-NITROGEN', target: 'ZONE A-12 NORTH', price: '$42.50', status: 'REQ.' },
            { id: 'tm-2', name: 'MAGNESIUM SOL.', target: 'GENERAL', price: '$35.20', status: 'OPT.' }
        ]
    },
    {
        category: 'PESTICIDES',
        items: [
            { id: 'tp-1', name: 'PESTGUARD ULTRA', target: 'APHID CLUSTERS', price: '$128.00', status: 'CRITICAL' }
        ]
    }
];

export const scannerStatus = {
    isActive: true,
    nextUpdate: '04:12:00'
};
