/**
 * Processes features from ArcGIS API response to group by Crop_Name
 * and calculate total area per crop.
 * 
 * @param {Array} features - The features array from ArcGIS JSON response
 * @returns {Object} Grouped data keyed by Crop_Name
 */
export const processCropFeatures = (features) => {
    if (!features || !Array.isArray(features)) return {};

    return features.reduce((acc, feature) => {
        const { Crop_Name, area } = feature.attributes;

        acc[Crop_Name] = {
            cropName: Crop_Name,
            totalArea: area,
            featureCount: 0
        };

        return acc;
    }, {});
};
