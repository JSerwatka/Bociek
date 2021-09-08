import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from "react";
import { MapContainer, LayersControl, TileLayer, Popup, GeoJSON, LayerGroup, useMap } from 'react-leaflet'
import worldGeoJson from "../data/admin-center-m.json"
import avgTemp from "../data/weather data/average_air_temperature_centers.json"
import './Map.css';


// #TODO get new data from json for given motnh
// #TODO send the data to the map and render


function getTempColor(temp) {
  return temp > 40  ? '#d73027' :
         temp > 30  ? '#f46d43' :
         temp > 20  ? '#fdae61' :
         temp > 10  ? '#fee090' :
         temp > 0   ? '#ffffbf' :
         temp > -10 ? '#e0f3f8' :
         temp > -20 ? '#abd9e9' :
         temp > -30 ? '#74add1' :
                      '#4575b4';
}



function Map({month}) {
    const geoJsonRef = useRef();
    const monthRef = useRef(month)
    const currentPopupLayerRef = useRef();

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
      const temp = avgTemp.month[month][regionId]

      return {
        fillColor: getTempColor(temp),
        fillOpacity: 0.7,
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
      };
    }

    // function highlightFeature(e) {
    //   const layer = e.target;
    
    //   layer.setStyle({
    //     fillColor: "red",
    //     fillOpacity: 0.4,
    //   })
    // }

    // function resetHighlight(e) {
    //   geoJsonRef.current.resetStyle(e.target)
    // }

    // Loads all feature's data to a popup
    function createNewPopup(feature, layer) {
      const regionName = feature.properties.name;
      const regionId = feature.properties.id;
      const temp = avgTemp.month[monthRef.current][regionId];

      const popupContent = `
        <h3>${regionName}</h3>
        <p>Average Air Temperature: ${temp}</p>
      `;

      // Bind popup only if not alreay exits
      if (!layer.getPopup()) {
        const popupOptions = {
          className: "division-popup",
        };
  
        layer.bindPopup(popupContent,popupOptions).openPopup();
      }
      else {
        layer.setPopupContent(popupContent);
      }
      
      currentPopupLayerRef.current = {'layer': layer, 'feature': feature};
    }

  
    const onEachDivision = (feature, layer) => {
      layer.on({
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        click: () => {
          createNewPopup(feature, layer)
        }
      })
    }

    return (
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={3} minZoom={2} 
          scrollWheelZoom={true} 
          maxBounds={[[-90, -180], [90, 180]]}
          // whenCreated={ mapInstance => { mapRef.current = mapInstance } }
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
                <GeoJSON data={ worldGeoJson } style={ mapStyles } onEachFeature={ onEachDivision } ref={geoJsonRef}/>
              </MapContainer>
    );
}
  
export default Map;