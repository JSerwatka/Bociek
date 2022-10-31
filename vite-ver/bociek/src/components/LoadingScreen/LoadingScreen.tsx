import SunnyIcon from "./segments/SunnyIcon";
import PartlyCloudyIcon from "./segments/PartlyCloudyIcon";
import WindyIcon from "./segments/WindyIcon";
import RainyIcon from "./segments/RainyIcon";
import RainbowIcon from "./segments/RainbowIcon";

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
