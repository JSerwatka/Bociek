import { SupabaseClient } from "@supabase/supabase-js";
import { Layer, LeafletMouseEvent, Map as MapType, Popup as PopupType, StyleFunction } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { Ref, RefObject, useEffect, useRef } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";

import "../../styles/Map/map.css";
import { DataType, GlobalDataType, MonthsType } from "../../types/commonTypes";
import { fetchData, getAllDataTypePolygonWeatherData, getGlobalWeatherData } from "../../utils/fetchData";
import getColor from "../../utils/getColor";
import LayerChoice from "./partials/LayersChoice";
import Legend from "./partials/Legend";

interface MapProps {
    month: MonthsType;
    dataType: DataType;
    worldGeojson: any; // #TODO use better types
    januaryMaxTemp: GlobalDataType;
    supabase: SupabaseClient;
}

interface LayerLeaflet extends Layer {
    _popup: PopupType;
    setStyle: (styles: Record<string, string | number>) => void;
}

const Map = ({ month, dataType, worldGeojson, januaryMaxTemp, supabase }: MapProps) => {
    const mapRef = useRef<any>();
    const currentPopupLayerRef = useRef<any>();

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
        try {
            return {
                fillColor: getColor(dataTypeRef.current, januaryMaxTemp[regionId] as number),
                fillOpacity: 0.7,
                weight: 1,
                opacity: 1,
                color: "grey",
                dashArray: "3"
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
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
        if (currentPopupLayerRef.current.feature) {
            const feature = currentPopupLayerRef.current.feature;
            const styles = mapNewStyle(feature);

            currentPopupLayerRef.current.layer.setStyle(styles);
        }
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
            const weatherData = await getAllDataTypePolygonWeatherData(regionId, supabase);
            // // Update Popup
            popupContent = `
                <div class="popup-title">
                    <div class="country-name">${countryName}</div>
                    <div class="region-name">${regionName}</div>
                </div>
                <ul class="weather-data">
                    <li>Maximum air temperature: ${weatherData["max_temp"][monthRef.current]}°C</li>
                    <li>Average air temperature: ${weatherData["avg_temp"][monthRef.current]}°C</li>
                    <li>Minimum air temperature: ${weatherData["min_temp"][monthRef.current]}°C</li>
                    <li>Day length: ${weatherData["day_length"][monthRef.current]}</li>
                    <li>Precipitations: ${weatherData["precipitation"][monthRef.current]} mm</li>
                    <li>Rainy days (≥ 0.5 mm): ${weatherData["rainy_days"][monthRef.current]}%</li>
                    <li>Heavy rainy days (≥ 10 mm): ${weatherData["very_rainy_days"][monthRef.current]}%</li>
                    <li>Cloud cover: ${weatherData["cloud_cover"][monthRef.current]}%</li>
                </ul>
            `;
        } catch (err) {
            console.error((err as Error).message);
            popupContent = `Error while fetching data`;
        }

        layer.setPopupContent(popupContent);

        currentPopupLayerRef.current = { layer: layer, feature: feature };
    };

    const onEachDivision = async (feature: GeoJSON.Feature, layer: Layer) => {
        layer.on({
            popupclose: resetHighlight,
            click: async (e: LeafletMouseEvent) => {
                await createNewPopup(feature, layer as LayerLeaflet, e);
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
