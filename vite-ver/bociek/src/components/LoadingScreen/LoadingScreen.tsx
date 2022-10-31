import SunnyIcon from "./partials/SunnyIcon";
import PartlyCloudyIcon from "./partials/PartlyCloudyIcon";
import WindyIcon from "./partials/WindyIcon";
import RainyIcon from "./partials/RainyIcon";
import RainbowIcon from "./partials/RainbowIcon";

import "../../styles/LoadingScreen/loading-screen.css";

const LoadingScreen = () => {
    return (
        <div className="loading-page">
            <div className="weather-icons">
                <SunnyIcon />
                <PartlyCloudyIcon />
                <WindyIcon />
                <RainyIcon />
                <RainbowIcon />
            </div>
            <div className="loading-msg">Loading something beautiful for you</div>
        </div>
    );
};

export default LoadingScreen;
