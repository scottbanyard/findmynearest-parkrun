import * as React from 'react';
import { Layer, Source } from 'react-map-gl';
import { IParkrunLayersProps } from './types';
import {
  PointColours,
  PointSizes,
  Cluster,
  LayerIDs
} from '../../../../constants';

const ParkrunLayers = (props: IParkrunLayersProps) => {
  return (
    <div>
      <Source
        id="parkrun-geojson-unclustered"
        type="geojson"
        data={props.parkrunData}
      >
        {/* UNCLUSTERED PARKRUN POINT LAYER */}
        <Layer
          id={LayerIDs.Parkrun}
          type="circle"
          source="parkrun-geojson-unclustered"
          paint={{
            'circle-radius': PointSizes.Parkrun,
            'circle-color': [
              'match',
              ['get', 'parkrunClose'],
              'true',
              PointColours.ParkrunNearest,
              'false',
              PointColours.ParkrunDefault,
              /* other */ PointColours.ParkrunDefault
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
          layout={{
            visibility: props.cluster ? 'none' : 'visible'
          }}
        />
      </Source>

      <Source
        id="parkrun-geojson-clustered"
        type="geojson"
        data={props.parkrunData}
        cluster={true}
        clusterMaxZoom={Cluster.Zoom}
        clusterRadius={Cluster.Radius}
      >
        {/* UNCLUSTERED PARKRUN POINT LAYER (if zoomed in) */}
        <Layer
          id={LayerIDs.ParkrunInCluster}
          type="circle"
          source="parkrun-geojson-clustered"
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-radius': PointSizes.Parkrun,
            'circle-color': [
              'match',
              ['get', 'parkrunClose'],
              'true',
              PointColours.ParkrunNearest,
              'false',
              PointColours.ParkrunDefault,
              /* other */ PointColours.ParkrunDefault
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
          layout={{
            visibility: props.cluster ? 'visible' : 'none'
          }}
        />

        {/* CLUSTER PARKRUN LAYER */}
        <Layer
          id={LayerIDs.ParkrunCluster}
          type="circle"
          source="parkrun-geojson-clustered"
          filter={['has', 'point_count']}
          paint={{
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ],
            'circle-color': [
              'step',
              ['get', 'point_count'],
              PointColours.ParkrunClusteredFirstStep,
              100,
              PointColours.ParkrunClusteredSecondStep,
              750,
              PointColours.ParkrunClusteredThirdStep
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }}
          layout={{
            visibility: props.cluster ? 'visible' : 'none'
          }}
        />

        {/* CLUSTER TEXT FIELD LAYER */}
        <Layer
          id={LayerIDs.ParkrunClusterCount}
          type="symbol"
          source="parkrun-geojson-clustered"
          filter={['has', 'point_count']}
          layout={{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            visibility: props.cluster ? 'visible' : 'none'
          }}
          paint={{}}
        />
      </Source>
    </div>
  );
};

export default ParkrunLayers;
