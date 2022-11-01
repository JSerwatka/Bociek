import { Layer, LeafletMouseEvent, Popup as PopupType, StyleFunction } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";

import "../../styles/Map/map.css";
import { DataType, MonthsType } from "../../types/commonTypes";
import { fetchData } from "../../utils/fetchData";
import getColor from "../../utils/getColor";
import { getHoursFromTime } from "../../utils/hoursFromTime";
import LayerChoice from "./partials/LayersChoice";
import Legend from "./partials/Legend";

// #TODO fix types
interface MapProps {
    month: MonthsType;
    dataType: DataType;
    airTemp: any;
    precipitation: any;
    dayLength: any;
    worldGeojson: any;
}

interface LayerLeaflet extends Layer {
    _popup: PopupType;
    setStyle: (styles: Record<string, string | number>) => void;
}

const Map = ({ month, dataType, worldGeojson, airTemp, precipitation, dayLength }: MapProps) => {
    const mapRef = useRef<any>(); // #TODO use proper typ
    const currentPopupLayerRef = useRef<any>(); // #TODO use proper type

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

    const mapNewStyle = (feature: GeoJSON.Feature) => {
        const regionId = feature.properties?.id;
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

    const mapStyles = (feature: GeoJSON.Feature) => {
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

    const highlightFeature = (layer: LayerLeaflet) => {
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
    const createNewPopup = async (feature: GeoJSON.Feature, layer: LayerLeaflet, e?: LeafletMouseEvent) => {
        // Get feature data
        const regionName = feature.properties?.name ?? "unknown";
        const countryName = feature.properties?.country ?? "unknown";
        const regionId = feature.properties?.id;

        if (!regionId) {
            throw Error("This region doesn't exist");
        }

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

        try {
            // Bind popup only if doesn't already exitst
            if (!layer.getPopup() && e) {
                const popupOptions = { className: "division-popup" };
                const { _popup: popup } = layer.bindPopup(popupContent, popupOptions);
                // Open popup where user clicked not in the layer center
                popup.setLatLng(e.latlng).openOn(mapRef.current);
            } else {
                layer.setPopupContent(popupContent);
            }
        } catch (err) {
            console.log("error", err);
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
            console.error((err as Error).message);
            popupContent = `Error while fetching data`;
        }

        layer.setPopupContent(popupContent);

        currentPopupLayerRef.current = { layer: layer, feature: feature };
    };

    const onEachDivision = (feature: GeoJSON.Feature, layer: Layer) => {
        layer.on({
            popupclose: resetHighlight,
            click: (e: LeafletMouseEvent) => {
                createNewPopup(feature, layer as LayerLeaflet, e);
                highlightFeature(layer as LayerLeaflet);
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
            ref={mapRef}
        >
            <LayerChoice />
            <GeoJSON data={worldGeojson} style={mapStyles as StyleFunction} onEachFeature={onEachDivision} />
            <Legend dataType={dataType} />
        </MapContainer>
    );
};

export default Map;
