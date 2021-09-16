import { useState } from "react";
import "./PageInfo.css"


function PageInfo() {
    const [openPopup, setOpenPoup] = useState(false)

    return ( 
        <>
            {!openPopup &&
                <img className="page-info page-info-btn" 
                     onClick={() => setOpenPoup(true)}
                     title="About page"
                     src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzAwQzFGRDsiIGQ9Ik0yNTYsNTEyYy02OC4zOCwwLTEzMi42NjctMjYuNjI5LTE4MS4wMi03NC45OEMyNi42MjksMzg4LjY2NywwLDMyNC4zOCwwLDI1Ng0KCVMyNi42MjksMTIzLjMzMyw3NC45OCw3NC45OEMxMjMuMzMzLDI2LjYyOSwxODcuNjIsMCwyNTYsMHMxMzIuNjY3LDI2LjYyOSwxODEuMDIsNzQuOThDNDg1LjM3MSwxMjMuMzMzLDUxMiwxODcuNjIsNTEyLDI1Ng0KCXMtMjYuNjI5LDEzMi42NjctNzQuOTgsMTgxLjAyQzM4OC42NjcsNDg1LjM3MSwzMjQuMzgsNTEyLDI1Niw1MTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMDhBOEVFOyIgZD0iTTQzNy4wMiw3NC45OEMzODguNjY3LDI2LjYyOSwzMjQuMzgsMCwyNTYsMHY1MTJjNjguMzgsMCwxMzIuNjY3LTI2LjYyOSwxODEuMDItNzQuOTgNCglDNDg1LjM3MSwzODguNjY3LDUxMiwzMjQuMzgsNTEyLDI1NlM0ODUuMzcxLDEyMy4zMzMsNDM3LjAyLDc0Ljk4eiIvPg0KPGc+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0U0RjdGRjsiIHBvaW50cz0iMzAxLDM3MSAzMDEsMjIxIDE5MSwyMjEgMTkxLDI1MSAyMTEsMjUxIDIxMSwzNzEgMTkwLDM3MSAxOTAsNDAxIDMyMCw0MDEgMzIwLDM3MSAJIi8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0U0RjdGRjsiIGQ9Ik0yNTYsMTkxYzI0LjgxMywwLDQ1LTIwLjE4Nyw0NS00NXMtMjAuMTg3LTQ1LTQ1LTQ1cy00NSwyMC4xODctNDUsNDVTMjMxLjE4NywxOTEsMjU2LDE5MXoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQkVERkQ7IiBkPSJNMjU2LDE5MWMyNC44MTMsMCw0NS0yMC4xODcsNDUtNDVzLTIwLjE4Ny00NS00NS00NVYxOTF6Ii8+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0NCRURGRDsiIHBvaW50cz0iMzAxLDM3MSAzMDEsMjIxIDI1NiwyMjEgMjU2LDQwMSAzMjAsNDAxIDMyMCwzNzEgCSIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
                />
            }
            {openPopup && 
                <div className="page-info page-info-content rounded-box">
                    <div className="close-btn-wrapper">
                        <span className="close-btn" onClick={() => setOpenPoup(false)}>
                            <span className="close-icon">&times;</span>
                        </span>
                    </div>
                    <div className="contribution-info react-leaflet-info">
                        <div className="contribution-title">Built with</div>
                        <img src="https://react-leaflet.js.org/img/logo-title.svg"/>
                    </div>
                    <div className="contribution-info">
                        <div className="contribution-title">Data source</div>
                        <div className="lobelia-info-wrapper">
                            <div className="lobelia-info-content">
                                I am especially grateful to <a href="https://www.lobelia.earth/">Lobelia Earth</a> for allowing me to use their processed <a href="https://www.ecmwf.int/">ECMWF's</a> <a href="https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era5">ERA5 dataset</a>. 
                            </div>
                            <img src="https://pbs.twimg.com/profile_images/1061224343282290698/IUdQW-R0.jpg"/>
                        </div>
                    </div>
                    <div className="contribution-info">
                        <div className="contribution-title">Icons</div>
                        All icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.
                    </div>
                    <div className="contribution-info">
                        <div className="contribution-title">Other awesome tools I've used</div>
                        <ul className="tools-list">
                            <li>
                                For goejson data processing: <a href="https://turfjs.org/">turf</a>
                            </li>
                            <li>
                                As month slider: <a href="https://slider-react-component.vercel.app/">rc-slider</a>
                            </li>
                            <li>
                                For generating day length data: <a href="https://github.com/SatAgro/suntime">suntime</a>, <a href="https://dateutil.readthedocs.io/en/stable/">dateutil</a>, and <a href="https://pypi.org/project/timezonefinder/">timezonefinder</a>
                            </li>
                            <li>
                                For choosing choropleth map colors: <a href="https://colorbrewer2.org/">color brewer</a>
                            </li>
                        </ul>
                    </div>
                    <div className="github-logo">
                        <a href="https://github.com/JSerwatka/Bociek">
                            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            }
        </>
     );
}

export default PageInfo;