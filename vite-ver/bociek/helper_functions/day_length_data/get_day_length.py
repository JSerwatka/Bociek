import json
import datetime
from copy import deepcopy

from suntime import Sun, SunTimeException
from dateutil import tz
from timezonefinder import TimezoneFinder


def load_polygons(path: str) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        polygons = json.load(f)
    
    return polygons['features']

def check_if_polar_night_day(latitude: float, month: int) -> str:
    is_winter = month < 3 or month > 10
    is_summer = month > 4 and month < 9

    is_polar_night = (
        (is_summer and latitude < 0) or # For Southern Hemisphere
        (is_winter and latitude > 0)    # For Northern Hemisphere
    )
    is_polar_day = (
        (is_winter and latitude < 0) or # For Southern Hemisphere
        (is_summer and latitude > 0)    # For Northern Hemisphere
    )

    if is_polar_night:
        return 'polar night'
    elif is_polar_day:
        return 'polar day'
    else:
        raise ValueError()

def export_center_daylength_to_json(path: str):
        '''
            Generates new json files for all polygons' centers containing daylength data
            File 1: daylength
            File 2: sunrinse and sunset
        '''
        
        daylength_data = {
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

        sunrise_sunset_data = deepcopy(daylength_data)

        polygons = load_polygons(path)
        
        for polygon in polygons:
            lon, lat = polygon['properties']['center']

            # Find local timezone
            tz_finder = TimezoneFinder()
            timezone = tz.gettz(tz_finder.timezone_at(lng=lon, lat=lat))

            for month in range(12):
                date = datetime.date(2021, (month+1), 15)

                # Find sunrise/sunset/daylength for coords and date
                sun = Sun(lat, lon)
                try:
                    sunrise_iso = sun.get_local_sunrise_time(date, timezone)
                    sunset_iso = sun.get_local_sunset_time(date, timezone)

                    daylength_iso = sunset_iso - sunrise_iso
                    daylength_str = f'{daylength_iso.seconds//3600:02}:{(daylength_iso.seconds//60)%60:02}'

                    sunrise_str = sunrise_iso.strftime('%H:%M')
                    sunset_str = sunset_iso.strftime('%H:%M')

                    sunrise_data = [sunrise_str, sunset_str]
                except SunTimeException as e:
                    # https://www.wikiwand.com/en/Polar_night
                    # Handle polar day/night
                    polar_type = check_if_polar_night_day(lat, date.month)
                    if polar_type == 'polar day':
                        daylength_str = "24:00"
                    elif polar_type == 'polar night':
                        daylength_str = "00:00"

                    sunrise_data = polar_type

                # Insert new data to dicts
                daylength_data['month'][str(month)].append(daylength_str)
                sunrise_sunset_data['month'][str(month)].append(sunrise_data)

        # Save to a json
        with open(f'./data/daylength_centers.json', 'w') as f:
            json.dump(daylength_data, f)

        with open(f'./data/sunrise_sunset_centers.json', 'w') as f:
            json.dump(sunrise_sunset_data, f)

if __name__ == '__main__':
    export_center_daylength_to_json('../polygonsCenters/data/admin-center-m.json')

"""
# Using GeoNames API
def export_center_daylength_to_json(self, path: str, api_username: str):
        '''
            Generates new json files for all polygons' centers containing daylength data
            File 1: daylength
            File 2: sunrinse and sunset
        '''
        
        daylength_data = {
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

        sunrise_sunset_data = daylength_data.deepcopy()

        polygons = load_polygons(path)
        
        for polygon in polygons:
            lon, lat = polygon['properties']['center']

            payload = {
                'lat': lon,
                'lng': lat,
                'username': api_username
            }
       
            for month in range(1,13):
                payload['date'] = '2021-{month}-15'

                r = requests.get('http://api.geonames.org/timezoneJSON', params=payload)
                data = r.json()

                sunrise = datetime.datetime.fromisoformat(data['sunrise'])
                sunset = datetime.datetime.fromisoformat(data['sunset'])

                daylength_iso = sunset-sunrise
                daylength_str = f'{daylength_iso.seconds//3600:02}:{(daylength_iso.seconds//60)%60:02}'

                sunrise_str = f'{sunrise.hour:02}:{sunrise.minute:02}'
                sunset_str = f'{sunset.hour:02}:{sunset.minute:02}'

                # Insert new data to dicts
                daylength_data['month'][str(month)].append(daylength_str)
                sunrise_sunset_data['month'][str(month)].append([sunrise_str, sunset_str])

        # Save to a json
        with open(f'./data/daylength_centers.json', 'w') as f:
            json.dump(daylength_data, f)

        with open(f'./data/sunrise_sunset_centers.json', 'w') as f:
            json.dump(sunrise_sunset_data, f)
"""