import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from "react";
import { MapContainer, LayersControl, TileLayer, Popup, GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import './Map.css';
import Legend from "./Legend";

import getColor from "../utils/getColor"
import { getHoursFromTime } from "../utils/conversionFunctions";

import worldGeoJson from "../data/world-admin1.json"
import airTemp from "../data/weather data/maximum_air_temperature_centers.json"
import dayLength from "../data/sun data/daylength_centers.json"
import precipitation from "../data/weather data/precipitation_centers.json"


function Map({month, dataType}) {
    const geoJsonRef = useRef();
    const monthRef = useRef(month)
    const currentPopupLayerRef = useRef();
    const mapRef = useRef();
    
    useEffect(() => {
      // Required to use month in an event
      monthRef.current = month

      // Update currently opened popup data
      if(
        currentPopupLayerRef.current &&
        currentPopupLayerRef.current.layer.isPopupOpen()
      ) {
        const layer = currentPopupLayerRef.current.layer;
        const feature = currentPopupLayerRef.current.feature;
        createNewPopup(feature, layer)
      }
    }, [month])


    const mapStyles = (feature) => {
      const regionId = feature.properties.id
      // Get value for fiven data type and region id
      const value = dataType === 'temp'      ? airTemp.month[month][regionId]                     :
                    dataType === 'rain'      ? precipitation.month[month][regionId]               :
                    dataType === 'daylength' ? getHoursFromTime(dayLength.month[month][regionId]) :
                                               null;

      return {
        fillColor: getColor(dataType, value),
        fillOpacity: 0.7,
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
      };
    }

    // function highlightFeature(layer) {
    //   layer.setStyle({
    //     fillColor: "red",
    //     fillOpacity: 0.4,
    //   })
    // }

    // function resetHighlight() {
    //   if (currentPopupLayerRef.current){ 
    //     const feature = currentPopupLayerRef.current.feature;
    //     const styles = mapStyles(feature)
        

    //     currentPopupLayerRef.current.layer.setStyle(styles)
    //   }
    // }

    // Loads all feature's data to a popup
    function createNewPopup(feature, layer, e) {
      // Get feature data
      const regionName = feature.properties.name ? feature.properties.name : "unknown";
      const countryName = feature.properties.country;
      const regionId = feature.properties.id;

      // Get weather data
      const temp = airTemp.month[monthRef.current][regionId];
      const dayLengthData = dayLength.month[monthRef.current][regionId];
      const rain = precipitation.month[monthRef.current][regionId];

      //#DEBUG #TODO
      // console.log(`${regionName} (id:${regionId}} temp: ${temp} daylength: ${dayLengthData} daylength_norm: ${getHoursFromTime(dayLengthData)}`)

      // Create/Update Popup
      const popupContent = `
        <div class="popup-title">
          <div class="country-name">${countryName}</div>
          <div class="region-name">${regionName}</div>
        </div>
        <ul class="weather-data">
          <li>Maximum air temperature: ${temp}°C</li>
          <li>Day length: ${dayLengthData}</li>
          <li>Precipitations: ${rain}mm</li>
        </ul>
      `;

      // Bind popup only if not alreay exits
      if (!layer.getPopup()) {
        const popupOptions = {className: "division-popup",};
        const {_popup: popup} = layer.bindPopup(popupContent,popupOptions);

        // Open popup where user clicked not in the layer center
        popup.setLatLng(e.latlng).openOn(mapRef.current);
      }
      else {
        layer.setPopupContent(popupContent);
      }

      currentPopupLayerRef.current = {'layer': layer, 'feature': feature};
    }

  
    const onEachDivision = (feature, layer) => {
      layer.on({
        // popupclose: resetHighlight,
        click: (e) => {
          createNewPopup(feature, layer, e)
          // highlightFeature(layer)
        }
      })
    }

    return (
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={3} minZoom={2} 
          scrollWheelZoom={true} 
          maxBounds={[[-90, -220], [90, 220]]} 
          whenCreated={ mapInstance => { mapRef.current = mapInstance } }
        >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stadia.Outdoors">
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>             
          <LayersControl.BaseLayer name="Esri.NatGeoWorldMap">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>                     
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>     
          <LayersControl.BaseLayer name="Stamen.Watercolor">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}"
              subdomains='abcd'
              ext='jpg'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <GeoJSON data={ worldGeoJson } style={ mapStyles } onEachFeature={ onEachDivision } ref={ geoJsonRef }/>
        <Legend dataType={ dataType }/>
      </MapContainer>
    );
}
  
export default Map;