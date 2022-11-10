// TODO change name to BasicDataTypeType
export type DataType = "max_temp" | "precipitation" | "day_length";

export type MonthsType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const allDataTypes = [
    "max_temp",
    "cloud_cover",
    "ultra_rainy_days",
    "rainy_days",
    "precipitation",
    "min_temp",
    "sunrise_sunset",
    "day_length",
    "frost_days",
    "wind_speed",
    "very_rainy_days",
    "avg_temp"
] as const;

export type AllDataTypesType = typeof allDataTypes[number];

export type GlobalDataType = Record<number, number | string>;
