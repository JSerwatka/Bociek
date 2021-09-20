import { memo, useState } from "react/cjs/react.development";

import "./PageInfo.css"

function PageInfo() {
    const [openPopup, setOpenPoup] = useState(false)
    const [popupLoaded, setPopupLoaded] = useState(false)

    return ( 
        <>
            {!openPopup &&
                <img className="page-info page-info-btn" 
                     onClick={() => setOpenPoup(true)}
                     title="About page"
                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzExNC40OTcsMCwwLDExNC41MDcsMCwyNTZjMCwxNDEuNTAzLDExNC41MDcsMjU2LDI1NiwyNTZjMTQxLjUwMywwLDI1Ni0xMTQuNTA3LDI1Ni0yNTYgICAgQzUxMiwxMTQuNDk3LDM5Ny40OTIsMCwyNTYsMHogTTI1Niw0NzJjLTExOS4zOTMsMC0yMTYtOTYuNjE1LTIxNi0yMTZjMC0xMTkuMzkzLDk2LjYxNS0yMTYsMjE2LTIxNiAgICBjMTE5LjM5MywwLDIxNiw5Ni42MTUsMjE2LDIxNkM0NzIsMzc1LjM5MywzNzUuMzg0LDQ3MiwyNTYsNDcyeiIgZmlsbD0iIzA4NjU5OSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDIxNC4zM2MtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjB2MTI4Ljc5M2MwLDExLjA0Niw4Ljk1NCwyMCwyMCwyMHMyMC04Ljk1NSwyMC0yMC4wMDFWMjM0LjMzICAgIEMyNzYsMjIzLjI4NCwyNjcuMDQ2LDIxNC4zMywyNTYsMjE0LjMzeiIgZmlsbD0iIzA4NjU5OSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyNTYiIGN5PSIxNjIuODQiIHI9IjI3IiBmaWxsPSIjMDg2NTk5IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L2NpcmNsZT4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                     alt="About page button"                
                />
            }
            {openPopup && 
                <div className="page-info page-info-content rounded-box">
                    <div className="close-btn-wrapper">
                        <span className="close-btn" onClick={() => setOpenPoup(false)}>
                            <span className="close-icon">&times;</span>
                        </span>
                    </div>
                    <div className="loader-wrapper" style={{display: popupLoaded ? "none" : "flex"}}>
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div style={{visibility: popupLoaded ? "visible" : "hidden"}} onLoad={() => setPopupLoaded(true)}>
                        <div className="contribution-info react-leaflet-info">
                            <div className="contribution-title">Built with</div>
                            <img src="https://react-leaflet.js.org/img/logo-title.svg" alt="React Leaflet logo"/>
                        </div>
                        <div className="contribution-info">
                            <div className="contribution-title">Data source</div>
                            <div className="lobelia-info-wrapper">
                                <div className="lobelia-info-content">
                                    I am especially grateful to <a href="https://www.lobelia.earth/" target="_blank" rel="noopener noreferrer">Lobelia Earth</a> for allowing me to use their processed <a href="https://www.ecmwf.int/" target="_blank" rel="noopener noreferrer">ECMWF's</a> <a href="https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era5" target="_blank" rel="noopener noreferrer">ERA5 dataset</a>. 
                                </div>
                                <img src="https://pbs.twimg.com/profile_images/1061224343282290698/IUdQW-R0.jpg" alt="Lobelia Earth logo"/>
                            </div>
                        </div>
                        <div className="contribution-info">
                            <div className="contribution-title">Icons</div>
                            All icons made by <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>.
                        </div>
                        <div className="contribution-info">
                            <div className="contribution-title">Other awesome tools I've used</div>
                            <ul className="tools-list">
                                <li>
                                    For goejson data processing: <a href="https://turfjs.org/" target="_blank" rel="noopener noreferrer">turf</a>
                                </li>
                                <li>
                                    As month slider: <a href="https://slider-react-component.vercel.app/" target="_blank" rel="noopener noreferrer">rc-slider</a>
                                </li>
                                <li>
                                    For generating day length data: <a href="https://github.com/SatAgro/suntime" target="_blank" rel="noopener noreferrer">suntime</a>, <a href="https://dateutil.readthedocs.io/en/stable/" target="_blank" rel="noopener noreferrer">dateutil</a>, and <a href="https://pypi.org/project/timezonefinder/" target="_blank" rel="noopener noreferrer">timezonefinder</a>
                                </li>
                                <li>
                                    For choosing choropleth map colors: <a href="https://colorbrewer2.org/" target="_blank" rel="noopener noreferrer">color brewer</a>
                                </li>
                            </ul>
                        </div>
                        <div className="github-logo">
                            <a href="https://github.com/JSerwatka/Bociek" target="_blank" rel="noopener noreferrer">
                                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            }
        </>
     );
}

export default memo(PageInfo);