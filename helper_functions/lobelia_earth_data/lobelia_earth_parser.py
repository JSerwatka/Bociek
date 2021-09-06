import requests
import json
import sqlite3

class LobeliaEarthParser:
    '''
        Required:
            1. Create a db: 
                parser = LobeliaEarthParser('./data/wather_data.db')
            2. Load data to the db:
                parser.parse_all_data_for_data_type('average_air_temperature')
                ...
        Options:
            * Export data to json
                parser.export_weather_data_to_json('average_air_temperature', month=0)
            * Generate weather data for polygon centers
                export_center_data_to_json('../polygonsCenters/data/admin-center-m.json', 'average_air_temperature')
    '''

    data_type_to_url = {
        'average_air_temperature': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tasDayAvgMonthAvg/tasDayAvgMonthAvg',
        'maximum_air_temperature': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tasDayMaxMonthAvg/tasDayMaxMonthAvg',
        'minimum_air_temperature': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tasDayMinMonthAvg/tasDayMinMonthAvg',
        'frost_days': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tasDayMinMonthFrostRatio/tasDayMinMonthFrostRatio',
        'warm_nights': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tasDayMinMonthWarmRatio/tasDayMinMonthWarmRatio',
        'precipitation': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/prDaySumMonthSum/prDaySumMonthSum',
        'rainy_days': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/prDaySumMonthRainyRatio/prDaySumMonthRainyRatio',
        'very_rainy_days': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/prDaySumMonthVeryRainyRatio/prDaySumMonthVeryRainyRatio',
        'ultra_rainy_days': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/prDaySumMonthUltraRainyRatio/prDaySumMonthUltraRainyRatio',
        'relative_humidity': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/rhDayAvgMonthAvg/rhDayAvgMonthAvg',
        'average_wind_speed': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/sfcWindDayAvgMonthAvg/sfcWindDayAvgMonthAvg',
        'cloud_cover': 'https://files.isardsat.co.uk/era5/seasonalityTimeSlices/tccDayAvgMonthAvg/tccDayAvgMonthAvg'
    }

    def __init__(self, db_path):
        self.connection = sqlite3.connect(db_path)
        self.cursor = self.connection.cursor()

        self._create_tables()

    def __del__(self):
        self.connection.close()

    def _create_tables(self):
        for data_type in LobeliaEarthParser.data_type_to_url:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS {} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    lon REAL NOT NULL,
                    lat REAL NOT NULL,
                    value REAL NOT NULL,
                    month INTEGER NOT NULL,
                    UNIQUE(lon, lat, month)
                );
            '''.format(data_type))

    def parse_data_for_single_month(self, month: int, data_type: str) -> None:
        '''
            Requests for json data for a given month (0..11) from lobelia.earth servers and loads it to the db.
            
            Endpoint url is composed of:
                - url from data_type_to_url (based on requested data type)
                - '_{month}.json' sufix  

            ---
            Equation to find data for given latitude, longitude:
                latIDX*lonLEN + lonIDX
            where:
                * latLEN - length of latitude array (720)
                * lonLEN - length of longitude array (1440)
        '''

        # Construct request url
        data_type_url = LobeliaEarthParser.data_type_to_url[data_type]
        request_url = f"{data_type_url}_{month}.json"
        
        # Make a request
        r = requests.get(request_url)
        data = r.json()

        # Extract data from json
        latitudes = data['meta']['lats']
        longitudes = data['meta']['lons']
        longitudesLen = data['meta']['lonLen']

        # Load data to the db
        for (lat_idx, lat_val) in enumerate(latitudes):
            for (lon_idx, lon_val) in enumerate(longitudes):
                value = data['data'][lat_idx*longitudesLen + lon_idx]
                self.cursor.execute(f"INSERT INTO {data_type}(lon, lat, value, month) VALUES (?,?,?,?)", (lon_val, lat_val, value, month))
        self.connection.commit()

    def parse_all_data_for_data_type(self, data_type: str) -> None:
        '''
            For a given data_type (average air temperature, precipitation, ...)
            parses data for all months to the db
        '''

        for month in range(12):
            self.parse_data_for_single_month(month, data_type)

    def export_weather_data_to_json(self, data_type: str, month: int = -1) -> None:
        '''
            For a given data_type (average air temperature, precipitation, ...)
            generates a json file for a single month or for all months
        '''

        all_data = {
            'records': []
        }

        # month = -1 -> get all months
        if month == -1:
            for month_num in range(12):
                self.cursor.execute(f'SELECT lon, lat, value FROM {data_type} WHERE month=?', (month_num,))
                rows = self.cursor.fetchall()

                for row in rows:
                    all_data['records'].append(
                        {
                            'month': month_num,
                            'data': {
                                'coords': [row[0], row[1]], # [lon_val, lat_val]
                                'data': row[2] 
                            }
                        }
                    )
        else:
            self.cursor.execute(f'SELECT lon, lat, value FROM {data_type} WHERE month=?', (month,))
            rows = self.cursor.fetchall()

            for row in rows:
                all_data['records'].append({
                    'coords': [row[0], row[1]], # [lon_val, lat_val]
                    'value': row[2] 
                })

        with open(f'./data/{data_type}_{month}.json', 'w') as f:
            json.dump(all_data, f)

    def _load_polygons(self, path: str) -> None:
        with open(path, 'r', encoding='utf-8') as f:
            polygons = json.load(f)
        
        return polygons['features']

    def export_center_data_to_json(self, path: str, data_type: str):
        '''
            Generates new json file for all polygons' centers and given weather data type from the db data
        '''
        
        all_data = {
            'month': {
                '0': [],
                '1': [],
                '2': [],
                '3': [],
                '4': [],
                '5': [],
                '6': [],
                '7': [],
                '8': [],
                '9': [],
                '10': [],
                '11': []
            }
        }

        polygons = self._load_polygons(path)
        
        for polygon in polygons:
            lon, lat = polygon['properties']['center']
            id = polygon['properties']['id']

            # Get the avg value from the db closest to the center coordinates
            query_context = {
                'lon_min': lon-0.25,
                'lon_max': lon+0.25,
                'lat_min': lat-0.25,
                'lat_max': lat+0.25
            }
            
            for month in range(12):
                query_context['month'] = month

                self.cursor.execute("""
                    SELECT AVG(value) FROM {}
                    WHERE (lon BETWEEN :lon_min AND :lon_max)
                    AND (lat BETWEEN :lat_min AND :lat_max)
                    AND month=:month
                """.format(data_type), query_context)

                avg_data = round(self.cursor.fetchone()[0], 1)

                # Insert new data to a dict
                all_data['month'][str(month)].append({
                    'id': id,
                    'value': avg_data
                })

        # Save to a json
        with open(f'./data/{data_type}_centers.json', 'w') as f:
            json.dump(all_data, f)

if __name__ == "__main__":
    parser = LobeliaEarthParser('./data/wather_data.db')
    parser.export_weather_data_to_json('average_air_temperature')
    # parser.export_center_data_to_json('../polygonsCenters/data/admin-center-m.json', 'average_air_temperature')