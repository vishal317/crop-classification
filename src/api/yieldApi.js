import { API_ENDPOINTS } from "./endpoints";

export const fetchYieldResults = async (sectorId) => {
    // Simulating API call with mock data as per contract
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                crop: "CORN (MAIZE)",
                variety: "HYBRID VARIETY Z-90",
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
                        description: "NORTHEAST CORNER SHOWS EARLY SIGNS OF WATER STRESS.",
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
                        description: "CORN FUTURES TRENDING UP +1.2% THIS WEEK.",
                        icon: "FileText",
                        highlighted: false
                    }
                ],
                sectorId: sectorId || "A-12"
            });
        }, 1000);
    });
};
