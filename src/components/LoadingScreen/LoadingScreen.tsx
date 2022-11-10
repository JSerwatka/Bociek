import "../../styles/LoadingScreen/loading-screen.css";
import PartlyCloudyIcon from "./partials/PartlyCloudyIcon";
import RainbowIcon from "./partials/RainbowIcon";
import RainyIcon from "./partials/RainyIcon";
import SunnyIcon from "./partials/SunnyIcon";
import WindyIcon from "./partials/WindyIcon";

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
            <div className="loading-msg">Loading</div>
        </div>
    );
};

export default LoadingScreen;
