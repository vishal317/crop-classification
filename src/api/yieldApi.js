import apiService from "../services/apiService";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { processCropFeatures } from "../utils/cropDataProcessor";

/**
 * Fetches all identified crops from ArcGIS and groups them.
 */
export const fetchIdentifiedCrops = async () => {
    try {
        const response = await apiService.get(API_ENDPOINTS.ARCGIS_QUERY);
        return processCropFeatures(response.features);
    } catch (error) {
        console.error("Error fetching identified crops:", error);
        throw error;
    }
};

/**
 * Fetches yield results for a specific crop.
 * @param {string} cropName - The name of the crop selected by the user.
 * @param {string} sectorId - The sector identifier.
 */
export const fetchYieldResults = async (cropName, sectorId = "A-12") => {
    // Simulating API call with mock data as per contract
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        crop: cropName?.toUpperCase() || "CORN (MAIZE)",
        variety: `HYBRID VARIETY ${cropName === 'Alfalfa' ? 'A-42' : 'Z-90'}`,
        health: 88,
        healthDelta: 2,
        yieldGap: 12,
        yieldQuantity: {
            target: 2.5,
            predicted: 2.2
        },
        weeklyYield: [
            { week: "W1 (EARLY)", value: 0.5, type: "early" },
            { week: "W2 (EARLY)", value: 0.8, type: "early" },
            { week: "W3 (OPT.)", value: 1.5, type: "optimal" },
            { week: "W4 (PEAK)", value: 2.3, type: "peak" },
            { week: "W5 (OPT.)", value: 1.8, type: "optimal" },
            { week: "W6 (LATE)", value: 1.1, type: "late" },
            { week: "W7 (LATE)", value: 0.7, type: "late" }
        ],
        targetThreshold: 2.0,
        recommendations: [
            {
                title: "IRRIGATION",
                description: `NORTHEAST CORNER OF ${cropName?.toUpperCase()} FIELD SHOWS EARLY SIGNS OF WATER STRESS.`,
                icon: "Droplets",
                highlighted: false
            },
            {
                title: "HARVEST PREP",
                description: "SCHEDULE HARVESTING EQUIPMENT FOR PEAK WINDOW (W4).",
                icon: "Cogs",
                highlighted: true
            },
            {
                title: "SOIL ANALYSIS",
                description: "NITROGEN LEVELS OPTIMAL FOR FINAL GRAIN FILLING STAGE.",
                icon: "FlaskConical",
                highlighted: false
            },
            {
                title: "MARKET TREND",
                description: `${cropName?.toUpperCase()} FUTURES TRENDING UP +1.2% THIS WEEK.`,
                icon: "FileText",
                highlighted: false
            }
        ],
        sectorId: sectorId || "A-12"
    };
};

