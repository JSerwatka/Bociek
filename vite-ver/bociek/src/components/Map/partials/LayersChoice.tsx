import { memo } from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const LayerChoice = () => {
    return (
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
    );
};

export default memo(LayerChoice);
