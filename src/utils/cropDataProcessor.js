/**
 * Processes features from ArcGIS API response to group by Crop_Name
 * and calculate total area per crop.
 * 
 * @param {Array} features - The features array from ArcGIS JSON response
 * @returns {Object} Grouped data keyed by Crop_Name
 */
// A mapping from raster gridcodes to class names (1 through 12)
const CROP_CODE_MAP = {
    1: 'Forest',
    2: 'Corn',
    3: 'Soybeans',
    4: 'Wetlands',
    5: 'Developed/Barren',
    6: 'Open Water',
    7: 'Winter Wheat',
    8: 'Natural Vegetation',
    9: 'Fallow/Idle Cropland',
    10: 'Cotton',
    11: 'Sorghum',
    12: 'Alfalfa'
};

export const processCropFeatures = (features) => {
    if (!features || !Array.isArray(features)) return {};

    return features.reduce((acc, feature) => {
        const attr = feature.attributes;
        const gridcode = attr.gridcode || attr.GRIDCODE || attr.grid_code || 0;
        
        // Skip background/unknown or noise if necessary (e.g. gridcode 0)
        if (gridcode === 0) return acc;

        const cropName = CROP_CODE_MAP[gridcode] || `Cover Crop (Type ${gridcode})`;
        
        // Sum the Shape__Area (or AREA) attribute for each polygon
        const area = attr.Shape__Area || attr.AREA || attr.Shape_Area || 0;

        if (!acc[cropName]) {
            acc[cropName] = {
                cropName: cropName,
                totalArea: 0,
                featureCount: 0
            };
        }

        acc[cropName].totalArea += area;
        acc[cropName].featureCount += 1;

        return acc;
    }, {});
};
