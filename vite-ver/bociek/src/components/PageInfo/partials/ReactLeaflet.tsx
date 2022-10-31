import { memo } from "react";

const ReactLeflet = () => {
    return (
        <div className="contribution-info react-leaflet-info">
            <div className="contribution-title">Built with</div>
            <img src="https://react-leaflet.js.org/img/logo-title.svg" alt="React Leaflet logo" />
        </div>
    );
};

export default memo(ReactLeflet);
