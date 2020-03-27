import * as React from "react";
import { Layer } from 'react-map-gl';
import { IParkrunLayersProps } from "./types";
import { PARKRUN_LAYER_DEFAULT_COLOUR, PARKRUN_LAYER_NEAREST_COLOUR, PARKRUN_LAYER_SIZE } from "../constants";

const ParkrunLayers = (props: IParkrunLayersProps) => {
  if (props.cluster) {
    return (
      <div>

        {/* UNCLUSTERED PARKRUN POINT LAYER */}
        <Layer
          id="parkrun-unclustered-point"
          type="circle"
          source="parkrun-geojson"
          filter={["!", ["has", "point_count"]]}
          paint={{
            "circle-radius": PARKRUN_LAYER_SIZE,
            "circle-color": [
              "match",
              ["get", "parkrunClose"],
              "true",
              PARKRUN_LAYER_NEAREST_COLOUR,
              "false",
              PARKRUN_LAYER_DEFAULT_COLOUR,
              /* other */ PARKRUN_LAYER_DEFAULT_COLOUR
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
        />

        {/* CLUSTER PARKRUN LAYER */}
        <Layer
          id="parkrun-clusters"
          type="circle"
          source="parkrun-geojson"
          filter={["has", "point_count"]}
          paint={{
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40
            ],
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1"
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
          }}
        />

        {/* CLUSTER TEXT FIELD LAYER */}
        <Layer
          id="parkrun-cluster-count"
          type="symbol"
          source="parkrun-geojson"
          filter={["has", "point_count"]}
          layout={{
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
          }}
          paint={{}}
        />
      </div>
    )
  } else {
    return (
      <div>
        {/* UNCLUSTERED PARKRUN POINT LAYER */}
        <Layer
          id="parkrun-unclustered-point"
          type="circle"
          source="parkrun-geojson"
          paint={{
            "circle-radius": PARKRUN_LAYER_SIZE,
            "circle-color": [
              "match",
              ["get", "parkrunClose"],
              "true",
              PARKRUN_LAYER_NEAREST_COLOUR,
              "false",
              PARKRUN_LAYER_DEFAULT_COLOUR,
              /* other */ PARKRUN_LAYER_DEFAULT_COLOUR
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
        />
      </div>
    )
  }
}

export default ParkrunLayers;
