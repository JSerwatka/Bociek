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
                    <span className="close-btn" onClick={() => setOpenPoup(false)}>
                        <span className="close-icon">&times;</span>
                    </span>
                    <div className="contribution-info">
                        Built with <img src="https://react-leaflet.js.org/img/logo-title.svg"/>
                    </div>
                    <div className="contribution-info">
                        I am especially grateful to <a href="https://www.lobelia.earth/">Lobelia Earth</a> for allowing me to use their processed <a href="https://www.ecmwf.int/en/forecasts/datasets/reanalysis-datasets/era5">ERA5 dataset</a> from <a href="https://www.ecmwf.int/">ECMWF</a>. 
                        <img src="https://pbs.twimg.com/profile_images/1061224343282290698/IUdQW-R0.jpg"/>
                    </div>
                    <div className="contribution-info">
                        All icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                    </div>
                    <div className="contribution-info">
                        <h3>Other awesome tools I've used:</h3>
                        For goejson data processing: <a href="https://turfjs.org/">turf</a>
                        <a href="https://slider-react-component.vercel.app/">rc-slider</a>
                        For generating data length data: <a href="https://github.com/SatAgro/suntime">suntime</a>,
                        <a href="https://dateutil.readthedocs.io/en/stable/">dateutil</a>, and
                        <a href="https://pypi.org/project/timezonefinder/">timezonefinder</a>
                        For choosing choropleth map colors: <a href="https://colorbrewer2.org/">color brewer</a>
                    </div>

                    
                </div>
            }
        </>
     );
}

export default PageInfo;