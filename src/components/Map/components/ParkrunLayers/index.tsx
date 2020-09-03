import * as React from "react";
import { Layer, Source } from 'react-map-gl';
import { IParkrunLayersProps } from "./types";
import { PARKRUN_LAYER_DEFAULT_COLOUR, PARKRUN_LAYER_NEAREST_COLOUR, PARKRUNS_CLUSTERED_FIRST_STEP_COLOUR, PARKRUNS_CLUSTERED_SECOND_STEP_COLOUR, PARKRUNS_CLUSTERED_THIRD_STEP_COLOUR, PARKRUN_LAYER_SIZE, CLUSTER_RADIUS, CLUSTER_ZOOM } from "../../../constants";

const ParkrunLayers = (props: IParkrunLayersProps) => {
  return (
    <div>
      <Source id="parkrun-geojson-unclustered" type="geojson" data={props.parkrunData}>

        {/* UNCLUSTERED PARKRUN POINT LAYER */}
        <Layer
          id="parkrun-unclustered-point"
          type="circle"
          source="parkrun-geojson-unclustered"
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
          layout={{
            "visibility": props.cluster ? "none" : "visible"
          }}
        />
      </Source>

      <Source id="parkrun-geojson-clustered" type="geojson" data={props.parkrunData} cluster={true} clusterMaxZoom={CLUSTER_ZOOM} clusterRadius={CLUSTER_RADIUS}>

        {/* UNCLUSTERED PARKRUN POINT LAYER (if zoomed in) */}
        <Layer
          id="parkrun-unclustered-point-in-cluster"
          type="circle"
          source="parkrun-geojson-clustered"
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
          layout={{
            "visibility": props.cluster ? "visible" : "none"
          }}
        />

        {/* CLUSTER PARKRUN LAYER */}
        <Layer
          id="parkrun-clusters"
          type="circle"
          source="parkrun-geojson-clustered"
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
              PARKRUNS_CLUSTERED_FIRST_STEP_COLOUR,
              100,
              PARKRUNS_CLUSTERED_SECOND_STEP_COLOUR,
              750,
              PARKRUNS_CLUSTERED_THIRD_STEP_COLOUR
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
          }}
          layout={{
            "visibility": props.cluster ? "visible" : "none"
          }}
        />

        {/* CLUSTER TEXT FIELD LAYER */}
        <Layer
          id="parkrun-cluster-count"
          type="symbol"
          source="parkrun-geojson-clustered"
          filter={["has", "point_count"]}
          layout={{
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
            "visibility": props.cluster ? "visible" : "none"
          }}
          paint={{}}
        />
      </Source>
    </div>
  )
}

export default ParkrunLayers;
