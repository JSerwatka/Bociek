import { SupabaseClient } from "@supabase/supabase-js";
import { arrayBuffer } from "stream/consumers";

import { AllDataTypesType, DataType, MonthsType, allDataTypes } from "../types/commonTypes";
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

export const getGlobalWeatherData = async (
    dataType: DataType,
    month: MonthsType,
    supabase: SupabaseClient
): Promise<any> => {
    const { data, error } = await supabase.from(dataType).select("polygon_id,value").eq("month", month);
    const dataMap = new Map();

    if (!data) {
        throw new Error(`Data for ${dataType} and month ${month} a doesn't exist`);
    }

    if (error) {
        throw error;
    }

    data.forEach((element) =>
        dataMap.set(element.polygon_id, dataType === "day_length" ? getHoursFromTime(element.value) : element.value)
    );

    return Object.fromEntries(dataMap);
};
// export const getGlobalWeatherData = async (
//     dataType: DataType,
//     month: MonthsType,
//     regionId: number,
//     supabase: SupabaseClient
// ): Promise<number> => {
//     const { data, error } = await supabase
//         .from(dataType)
//         .select("value")
//         .eq("month", month)
//         .eq("polygon_id", regionId)
//         .single();

//     if (data?.value === undefined) {
//         throw new Error(`Data for ${dataType}, polygon id ${regionId} and month ${month} a doesn't exist`);
//     }

//     if (error) {
//         throw error;
//     }

//     return dataType === "day_length" ? getHoursFromTime(data.value) : data.value;
// };

export const getPolygonWeatherData = async (
    dataType: AllDataTypesType,
    regionId: number,
    supabase: SupabaseClient
): Promise<string[]> => {
    const { data, error } = await supabase
        .from("single_polygon_data")
        .select("values_by_month")
        .eq("data_type", dataType)
        .eq("polygon_id", regionId)
        .single();

    if (data?.values_by_month === undefined) {
        throw new Error(`Data for ${dataType} and polygon id ${regionId} doesn't exist`);
    }

    if (error) {
        throw error;
    }

    return data.values_by_month;
};

export const getAllDataTypePolygonWeatherData = async (
    regionId: number,
    supabase: SupabaseClient
): Promise<Record<AllDataTypesType, string[]>> => {
    const dataByDataTypeMap = new Map();

    for (const dataType of allDataTypes) {
        dataByDataTypeMap.set(dataType, await getPolygonWeatherData(dataType, regionId, supabase));
    }

    return Object.fromEntries(dataByDataTypeMap);
};
