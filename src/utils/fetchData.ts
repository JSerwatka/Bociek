import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { DataType, MonthsType } from "../types/commonTypes";
import { getHoursFromTime } from "./hoursFromTime";

export const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
    } else {
        throw new Error("Could not fetch the data for that resource");
    }
};

type WeatherQueryReturnType = Promise<[number | string | string[], PostgrestError | null]>;

export const getGlobalWeatherData = async (
    dataType: DataType,
    month: MonthsType,
    regionId: number,
    supabase: SupabaseClient
): WeatherQueryReturnType => {
    const { data, error } = await supabase
        .from(dataType)
        .select("value")
        .eq("month", month)
        .eq("polygon_id", regionId)
        .single();

    return [dataType === "day_length" ? getHoursFromTime(data?.value) : data?.value, error];
};

export const getPolygonWeatherData = async (
    dataType: DataType,
    regionId: number,
    supabase: SupabaseClient
): WeatherQueryReturnType => {
    const { data, error } = await supabase
        .from("single_polygon_data")
        .select("values_by_month")
        .eq("data_type", dataType)
        .eq("polygon_id", regionId)
        .single();

    return [data?.values_by_month, error];
};
