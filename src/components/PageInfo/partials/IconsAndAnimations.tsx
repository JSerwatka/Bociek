import { memo } from "react";

const IconsAndAnimations = () => {
    return (
        <div className="contribution-info">
            <div className="contribution-title">Icons and animations</div>
            <ul className="info-list">
                <li>
                    All icons made by{" "}
                    <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">
                        Freepik
                    </a>{" "}
                    from{" "}
                    <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">
                        www.flaticon.com
                    </a>
                    .
                </li>
                <li>
                    Loading screen weather animation based on{" "}
                    <a href="https://codepen.io/code4food/pen/rLvggd" target="_blank" rel="noopener noreferrer">
                        codepen
                    </a>{" "}
                    by{" "}
                    <a href="https://codepen.io/code4food" target="_blank" rel="noopener noreferrer">
                        Tuan Hoang
                    </a>
                </li>
                <li>
                    Loading screen dots animation based on{" "}
                    <a href="https://codepen.io/jakob-e/pen/mKceA" target="_blank" rel="noopener noreferrer">
                        codepen
                    </a>{" "}
                    by{" "}
                    <a href="https://codepen.io/jakob-e" target="_blank" rel="noopener noreferrer">
                        jakob-e
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default memo(IconsAndAnimations);
