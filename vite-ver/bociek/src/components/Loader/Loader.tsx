import { memo } from "react";

import "../../styles/Loader/loader.css";

const Loader = () => {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default memo(Loader);
