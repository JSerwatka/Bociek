import SunnyIcon from "./Icons/SunnyIcon";
import PartlyCloudyIcon from "./Icons/PartlyCloudyIcon";
import WindyIcon from "./Icons/WindyIcon";
import RainyIcon from "./Icons/RainyIcon";
import RainbowIcon from "./Icons/RainbowIcon";

import "./LoadingScreen.css";

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
