import csv
import json


WEATHER_BASE_PATH = "../../src/data/weather data"
SUN_BASE_PATH = "../../src/data/sun data"
OUTPUT_BASE_PATH = "./data"

fielePaths = {
    "max_temp": f"{WEATHER_BASE_PATH}/maximum_air_temperature_centers.json",
    "avg_temp": f"{WEATHER_BASE_PATH}/average_air_temperature_centers.json",
    "min_temp": f"{WEATHER_BASE_PATH}/minimum_air_temperature_centers.json",
    "precipitation": f"{WEATHER_BASE_PATH}/precipitation_centers.json",
    "rainy_days": f"{WEATHER_BASE_PATH}rainy_days_centers.json",
    "very_rainy_days": f"{WEATHER_BASE_PATH}/very_rainy_days_centers.json",
    "ultra_rainy_days": f"{WEATHER_BASE_PATH}/ultra_rainy_days_centers.json",
    "wind_speed": f"{WEATHER_BASE_PATH}/average_wind_speed_centers.json",
    "cloud_cover": f"{WEATHER_BASE_PATH}/cloud_cover_centers.json",
    "frost_days": f"{WEATHER_BASE_PATH}/frost_days_centers.json",
    "day_length": f"{SUN_BASE_PATH}/daylength_centers.json",
    "sunrise_sunset": f"{SUN_BASE_PATH}/sunrise_sunset_centers.json"
}

def parse_global_data_to_csv(data_type):   
    # load all json data
    with open(fielePaths[data_type], "r") as f:
        global_data_json = json.load(f)["month"]

    # Structure data to polygon_id,month,value
    data_dicts = []
    
    for month in global_data_json:
        for (index, value) in enumerate(global_data_json[month]):
            data_dicts.append({
                "polygon_id": index,
                "month": month,
                "value": value
            })
        
    # # write to csv
    with open(f"{OUTPUT_BASE_PATH}/global_data/{data_type}.csv", "w", newline="") as f:
        fieldnames = ["polygon_id", "month", "value"]
        
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        
        for data in data_dicts:
            csv_writer.writerow(data)

            
if __name__ == "__main__":
    # global data (max_temp, participations, day_length)
    parse_global_data_to_csv("max_temp")
    parse_global_data_to_csv("precipitation")
    parse_global_data_to_csv("day_length")