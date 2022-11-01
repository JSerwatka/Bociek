import { memo } from "react";

const AdditionalTools = () => {
    return (
        <div className="contribution-info">
            <div className="contribution-title">Other awesome tools I've used</div>
            <ul className="info-list">
                <li>
                    For goejson data processing:{" "}
                    <a href="https://turfjs.org/" target="_blank" rel="noopener noreferrer">
                        turf
                    </a>
                </li>
                <li>
                    As month slider:{" "}
                    <a href="https://slider-react-component.vercel.app/" target="_blank" rel="noopener noreferrer">
                        rc-slider
                    </a>
                </li>
                <li>
                    For generating day length data:{" "}
                    <a href="https://github.com/SatAgro/suntime" target="_blank" rel="noopener noreferrer">
                        suntime
                    </a>
                    ,{" "}
                    <a href="https://dateutil.readthedocs.io/en/stable/" target="_blank" rel="noopener noreferrer">
                        dateutil
                    </a>
                    , and{" "}
                    <a href="https://pypi.org/project/timezonefinder/" target="_blank" rel="noopener noreferrer">
                        timezonefinder
                    </a>
                </li>
                <li>
                    For choosing choropleth map colors:{" "}
                    <a href="https://colorbrewer2.org/" target="_blank" rel="noopener noreferrer">
                        color brewer
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default memo(AdditionalTools);
