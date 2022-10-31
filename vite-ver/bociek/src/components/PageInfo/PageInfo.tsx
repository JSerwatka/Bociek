import { memo, useState } from "react";
import "../../styles/PageInfo/page-info.css";
import Loader from "../Loader/Loader";
import CloseButton from "./buttons/CloseButton";
import PageInfoButton from "./buttons/PageInfoButton";
import AdditionalTools from "./partials/AdditionalTools";
import DataSource from "./partials/DataSource";
import GithubLogo from "./partials/GithubLogo";
import IconsAndAnimations from "./partials/IconsAndAnimations";
import ReactLeaflet from "./partials/ReactLeaflet";

function PageInfo() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupLoaded, setPopupLoaded] = useState(false);

    return (
        <>
            {!isPopupOpen && <PageInfoButton openPopup={() => setIsPopupOpen(true)} />}
            {isPopupOpen && (
                <div className="page-info page-info-content rounded-box">
                    <CloseButton closePopup={() => setIsPopupOpen(false)} />
                    <div className="loader-wrapper" style={{ display: popupLoaded ? "none" : "flex" }}>
                        <Loader />
                    </div>
                    <div style={{ visibility: popupLoaded ? "visible" : "hidden" }} onLoad={() => setPopupLoaded(true)}>
                        <ReactLeaflet />
                        <DataSource />
                        <IconsAndAnimations />
                        <AdditionalTools />
                        <GithubLogo />
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(PageInfo);
