import { SupabaseClient } from "@supabase/supabase-js";

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

export const getPolygonWeatherData = async (
    dataType: AllDataTypesType,
    regionId: number,
    supabase: SupabaseClient
): Promise<string[]> => {
    console.time();
    const { data, error } = await supabase
        .from("single_polygon_data")
        .select("values_by_month")
        .eq("data_type", dataType)
        .eq("polygon_id", regionId)
        .single();
    console.timeEnd();

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

    const { data, error } = await supabase
        .from("single_polygon_data")
        .select("data_type,values_by_month")
        .eq("polygon_id", regionId);

    if (!data) {
        throw new Error(`Data for polygon id ${regionId} doesn't exist`);
    }

    if (error) {
        throw error;
    }

    data.forEach((element) => dataByDataTypeMap.set(element.data_type, element.values_by_month));

    return Object.fromEntries(dataByDataTypeMap);
};
