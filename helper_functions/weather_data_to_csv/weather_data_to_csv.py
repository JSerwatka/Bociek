import csv
import json


WEATHER_BASE_PATH = "../../src/data/weather data"
SUN_BASE_PATH = "../../src/data/sun data"
OUTPUT_BASE_PATH = "./data"

FILE_PATHS = {
    "max_temp": f"{WEATHER_BASE_PATH}/maximum_air_temperature_centers.json",
    "avg_temp": f"{WEATHER_BASE_PATH}/average_air_temperature_centers.json",
    "min_temp": f"{WEATHER_BASE_PATH}/minimum_air_temperature_centers.json",
    "precipitation": f"{WEATHER_BASE_PATH}/precipitation_centers.json",
    "rainy_days": f"{WEATHER_BASE_PATH}/rainy_days_centers.json",
    "very_rainy_days": f"{WEATHER_BASE_PATH}/very_rainy_days_centers.json",
    "ultra_rainy_days": f"{WEATHER_BASE_PATH}/ultra_rainy_days_centers.json",
    "wind_speed": f"{WEATHER_BASE_PATH}/average_wind_speed_centers.json",
    "cloud_cover": f"{WEATHER_BASE_PATH}/cloud_cover_centers.json",
    "frost_days": f"{WEATHER_BASE_PATH}/frost_days_centers.json",
    "day_length": f"{SUN_BASE_PATH}/daylength_centers.json",
    "sunrise_sunset": f"{SUN_BASE_PATH}/sunrise_sunset_centers.json"
}

def parse_global_data_to_csv(data_type):   
    print(f"Parsing {data_type} global data")
    
    # load all json data
    with open(FILE_PATHS[data_type], "r") as f:
        global_data_json = json.load(f)["month"]

    # structure data to polygon_id,month,value
    data_dicts = []
    
    counter = 0
    
    for month in global_data_json:
        for (index, value) in enumerate(global_data_json[month]):
            data_dicts.append({
                "id": counter,
                "polygon_id": index,
                "month": month,
                "value": value
            })
            counter += 1
        
    # write to csv
    with open(f"{OUTPUT_BASE_PATH}/global_data/{data_type}.csv", "w", newline="") as f:
        fieldnames = ["id", "polygon_id", "month", "value"]
        
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        
        for data in data_dicts:
            csv_writer.writerow(data)

def parse_single_polygon_data():
    data_dicts = []
    counter = 0
    # structure data to polygon_id, data_type, values_by_month for every data type
    for data_type, path in FILE_PATHS.items():
        print(f"Parsing {data_type} data types")
        
        # load json data for a data type
        with open(path, "r") as f:
            data_type_data_json = json.load(f)["month"]
        
        amount_of_data = len(data_type_data_json["0"])
        
        for index in range(amount_of_data):
            values_by_month = []
            for month in data_type_data_json:               
                if data_type == "sunrise_sunset":
                    value_from_json = data_type_data_json[month][index]
                    if value_from_json == "polar day" or value_from_json == "polar night":
                        output_values = value_from_json
                    else:
                        output_values = "-".join(value_from_json)
                else:
                    output_values = data_type_data_json[month][index]
                values_by_month.append(output_values)
                
            # format array to postgres accaptable format
            values_by_month_str = f"{{{str(values_by_month)[1:-1]}}}"
  
            data_dicts.append({
                "id": counter,
                "polygon_id": index,
                "data_type": data_type,
                "values_by_month": values_by_month_str
            })
            counter += 1
    
    # write to a csv
    with open(f"{OUTPUT_BASE_PATH}/single_polygon_data/single_polygon_data.csv", "w", newline="") as f:
        fieldnames = ["id", "polygon_id", "data_type", "values_by_month"]
        
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        
        for data in data_dicts:
            csv_writer.writerow(data)
            
if __name__ == "__main__":
    # global data (max_temp, participations, day_length)
    parse_global_data_to_csv("max_temp")
    parse_global_data_to_csv("precipitation")
    parse_global_data_to_csv("day_length")
    
    # single polygon data (polygon_id, data_type, values_by_month)
    # WARNING! DictWriter automatically puts ' sign for strings, which is added also by supabase importer
    # To prevent issues - after generating a file - remove all ' signs
    parse_single_polygon_data()