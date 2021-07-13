import React from 'react';
import './App.css';
import "leaflet/dist/leaflet.css"
import { MapContainer, LayersControl, TileLayer, Popup, GeoJSON } from 'react-leaflet'
import world from "./data/admin-m.json"


const mapStyles = () => {
  return {
    // fillColor: "red",
    // fillOpacity: 0.1,
    weight: 1,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
  };
}

const changeDivisionColor = (e) => {
  e.target.setStyle({
    fillColor: "red",
    fillOpacity: 0.4,
  })
}

const onEachDivision = (feature, layer) => {
  const division = feature.properties.name;
  layer.bindPopup(division)
  layer.on({
    click: changeDivisionColor
  })
}

function App() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} minZoom={2} scrollWheelZoom={true} maxBounds={[[-90, -180], [90, 180]]}>
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
        <LayersControl.BaseLayer name="Stadia.AlidadeSmoothDark">
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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
      <GeoJSON data={ world.features } style={ mapStyles } onEachFeature={ onEachDivision } />
    </MapContainer>
      );
}

      export default App;
