import { useEffect, useRef } from "react";

import { MapContainer, LayersControl, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

import "./Map.css";
import Legend from "../Legend/Legend";
import getColor from "../../utils/getColor";
import { getHoursFromTime } from "../../utils/conversionFunctions";

import fetchData from "../../utils/fetchData";
import { DataType, MonthsType } from "../../types/commonTypes";

interface MapProps {
    month: MonthsType;
    dataType: DataType;
    airTemp: unknown;
    precipitation: unknown;
    dayLength: unknown;
    worldGeojson: unknown;
}

const Map = ({ month, dataType, worldGeojson, airTemp, precipitation, dayLength }: MapProps) => {
    const mapRef = useRef();
    const currentPopupLayerRef = useRef();

    // Required to use month and dataType in events
    const monthRef = useRef(month);
    const dataTypeRef = useRef(dataType);
    monthRef.current = month;
    dataTypeRef.current = dataType;

    useEffect(() => {
        // Update currently opened popup data
        if (currentPopupLayerRef.current && currentPopupLayerRef.current.layer.isPopupOpen()) {
            const layer = currentPopupLayerRef.current.layer;
            const feature = currentPopupLayerRef.current.feature;
            createNewPopup(feature, layer);
        }
    }, [month]);

    const mapNewStyle = (feature) => {
        const regionId = feature.properties.id;
        // Get value for fiven data type and region id
        const value =
            dataTypeRef.current === "temp"
                ? airTemp.month[monthRef.current][regionId]
                : dataTypeRef.current === "rain"
                ? precipitation.month[monthRef.current][regionId]
                : dataTypeRef.current === "daylength"
                ? getHoursFromTime(dayLength.month[monthRef.current][regionId])
                : null;

        return {
            fillColor: getColor(dataTypeRef.current, value),
            fillOpacity: 0.7,
            weight: 1,
            opacity: 1,
            color: "grey",
            dashArray: "3"
        };
    };

    const mapStyles = (feature) => {
        // Don't change color of highlighted feature
        if (
            currentPopupLayerRef.current &&
            currentPopupLayerRef.current.layer.isPopupOpen() &&
            currentPopupLayerRef.current.feature === feature
        ) {
            return;
        }
        return mapNewStyle(feature);
    };

    const highlightFeature = (layer) => {
        layer.setStyle({
            fillColor: "red",
            fillOpacity: 0.4
        });
    };

    const resetHighlight = () => {
        const feature = currentPopupLayerRef.current.feature;
        const styles = mapNewStyle(feature);

        currentPopupLayerRef.current.layer.setStyle(styles);
    };

    // Loads all feature's data to a popup
    const createNewPopup = async (feature, layer) => {
        // Get feature data
        const regionName = feature.properties.name ? feature.properties.name : "unknown";
        const countryName = feature.properties.country;
        const regionId = feature.properties.id;

        // Loading data popup
        let popupContent = `
        <div class="popup-title">
          <div class="country-name">${countryName}</div>
          <div class="region-name">${regionName}</div>
        </div>
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      `;

        // Bind popup only if not alreay exits
        if (!layer.getPopup()) {
            const popupOptions = { className: "division-popup" };
            const { _popup: popup } = layer.bindPopup(popupContent, popupOptions);

            // Open popup where user clicked not in the layer center
            popup.setLatLng(e.latlng).openOn(mapRef.current);
        } else {
            layer.setPopupContent(popupContent);
        }

        // Get weather data
        try {
            const temp = airTemp.month[monthRef.current][regionId];
            const dayLengthData = dayLength.month[monthRef.current][regionId];
            const rain = precipitation.month[monthRef.current][regionId];

            const avgTemp = await fetchData(
                "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/average_air_temperature_centers.json"
            );
            const minTemp = await fetchData(
                "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/minimum_air_temperature_centers.json"
            );
            const rainyDays = await fetchData(
                "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/rainy_days_centers.json"
            );
            const veryRainyDays = await fetchData(
                "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/very_rainy_days_centers.json"
            );
            const cloudCover = await fetchData(
                "https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/cloud_cover_centers.json"
            );
            const avgTempData = avgTemp.month[monthRef.current][regionId];
            const minTempData = minTemp.month[monthRef.current][regionId];
            const rainyDaysData = rainyDays.month[monthRef.current][regionId];
            const veryRainyDaysData = veryRainyDays.month[monthRef.current][regionId];
            const cloudCoverData = cloudCover.month[monthRef.current][regionId];

            // // Update Popup
            popupContent = `
          <div class="popup-title">
            <div class="country-name">${countryName}</div>
            <div class="region-name">${regionName}</div>
          </div>
          <ul class="weather-data">
            <li>Maximum air temperature: ${temp}°C</li>
            <li>Average air temperature: ${avgTempData}°C</li>
            <li>Minimum air temperature: ${minTempData}°C</li>
            <li>Day length: ${dayLengthData}</li>
            <li>Precipitations: ${rain} mm</li>
            <li>Rainy days (≥ 0.5 mm): ${rainyDaysData}%</li>
            <li>Heavy rainy days (≥ 10 mm): ${veryRainyDaysData}%</li>
            <li>Cloud cover: ${cloudCoverData}%</li>
          </ul>
        `;
        } catch (err) {
            console.error(err.message);

            popupContent = `Error while fetching data`;
        }

        layer.setPopupContent(popupContent);

        currentPopupLayerRef.current = { layer: layer, feature: feature };
    };

    const onEachDivision = (feature, layer) => {
        layer.on({
            popupclose: resetHighlight,
            click: (e) => {
                createNewPopup(feature, layer, e);
                highlightFeature(layer);
            }
        });
    };

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={3}
            minZoom={2}
            scrollWheelZoom={true}
            maxBounds={[
                [-90, -220],
                [90, 220]
            ]}
            whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
            }}
        >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Stamen.Watercolor">
                    <TileLayer
                        attribution='Map tiles by <a href="http://stamen.com" target="_blank" rel="noopener noreferrer">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0" target="_blank" rel="noopener noreferrer">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}"
                        subdomains="abcd"
                        ext="jpg"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Esri.NatGeoWorldMap">
                    <TileLayer
                        attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenTopoMap">
                    <TileLayer
                        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org" target="_blank" rel="noopener noreferrer">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org" target="_blank" rel="noopener noreferrer">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC-BY-SA</a>)'
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <GeoJSON data={worldGeojson} style={mapStyles} onEachFeature={onEachDivision} />
            <Legend dataType={dataType} />
        </MapContainer>
    );
};

export default Map;
