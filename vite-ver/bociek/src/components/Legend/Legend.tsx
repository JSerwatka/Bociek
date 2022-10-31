import { memo, useEffect, useRef } from "react";

import L from "leaflet";
import { useMap } from "react-leaflet";
import "../../styles/Legend/legend.css";
import { DataType } from "../../types/commonTypes";
import { createLegend } from "../../utils/mapManipulation";

interface LegendProps {
    dataType: DataType;
}

function Legend({ dataType }: LegendProps) {
    const map = useMap();
    const currentLegend = useRef<HTMLElement>();

    useEffect(() => {
        createLegend(dataType);

        // Remove previous legend from DOM
        if (currentLegend.current) {
            currentLegend.current.remove();
        }

        // Add new legend to the map
        // TODO remove
        //@ts-ignore
        const legend = L.control({ position: "bottomright" });

        legend.onAdd = createLegend;
        legend.addTo(map);

        // Update info about current legend
        currentLegend.current = legend;
    }, [dataType, map]);

    return <></>;
}

export default memo(Legend);
