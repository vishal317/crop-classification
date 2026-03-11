export const API_ENDPOINTS = {
    UPLOAD_IMAGE: "/upload-image",
    FETCH_FILTERS: "/filters",
    FETCH_FIELD_PROFILE: "/api/field-profile",
    START_ANALYSIS: "/start-analysis",
    ANALYSIS_RESULT_PATH: "/analysis/result",
    ARCGIS_QUERY: "https://services7.arcgis.com/thejR7S8L6Ql48EA/arcgis/rest/services/crops_classificarion/FeatureServer/0/query?where=1=1&groupByFieldsForStatistics=Crop_Name&outStatistics=[%7B%22statisticType%22:%22sum%22,%22onStatisticField%22:%22Shape__Area%22,%22outStatisticFieldName%22:%22area%22%7D]&returnGeometry=false&f=json",
};
