import SunnyIcon from "./icons/SunnyIcon";
import PartlyCloudyIcon from "./icons/PartlyCloudyIcon";
import WindyIcon from "./icons/WindyIcon";
import RainyIcon from "./icons/RainyIcon";
import RainbowIcon from "./icons/RainbowIcon";

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
