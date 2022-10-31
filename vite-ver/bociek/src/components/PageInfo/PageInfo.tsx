import { memo, useState } from "react";
import "../../styles/PageInfo/page-info.css";
import CloseButton from "./buttons/CloseButton";
import PageInfoButton from "./buttons/PageInfoButton";
import AdditionalTools from "./segments/AdditionalTools";
import DataSource from "./segments/DataSource";
import GithubLogo from "./segments/GithubLogo";
import IconsAndAnimations from "./segments/IconsAndAnimations";

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
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div style={{ visibility: popupLoaded ? "visible" : "hidden" }} onLoad={() => setPopupLoaded(true)}>
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
