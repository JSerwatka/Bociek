import { memo } from "react";

const DataSource = () => {
    return (
        <div className="contribution-info">
            <div className="contribution-title">Data source</div>
            <div className="lobelia-info-wrapper">
                <div className="lobelia-info-content">
                    I am especially grateful to{" "}
                    <a href="https://www.lobelia.earth/" target="_blank" rel="noopener noreferrer">
                        Lobelia Earth
                    </a>{" "}
                    for allowing me to use their processed{" "}
                    <a href="https://www.ecmwf.int/" target="_blank" rel="noopener noreferrer">
                        ECMWF's
                    </a>{" "}
                    <a
                        href="https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era5"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ERA5 dataset
                    </a>
                    .
                </div>
                <div className="lobelia-earth-img-wrapper">
                    <img
                        src="https://bociek-weather-data.s3.eu-de.cloud-object-storage.appdomain.cloud/lobelia-logo.jpg"
                        alt="Lobelia Earth logo"
                    />
                </div>
            </div>
            <div className="geojson-info">
                Original (before processing) admin1 polygons GeoJSON from{" "}
                <a href="https://datahub.io/core/geo-ne-admin1" target="_blank" rel="noopener noreferrer">
                    datahub
                </a>
            </div>
        </div>
    );
};

export default memo(DataSource);
