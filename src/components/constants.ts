// MAP STYLE
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

// EXTERNAL URLS
export enum URLs {
  ParkrunGeoJSON = 'https://images.parkrun.com/events.json',
  MapboxDirections = 'https://api.mapbox.com/directions/v5/mapbox'
}

// COLOURS - http://colorsafe.co/
export enum PointColours {
  ParkrunDefault = '#BAF73C',
  AddressDefault = '#86e2d5',
  ParkrunNearest = '#ef4836',
  ParkrunClusteredFirstStep = '#51bbd6',
  ParkrunClusteredSecondStep = '#f1f075',
  ParkrunClusteredThirdStep = '#f28cb1'
}

// POINT SIZES
export enum PointSizes {
  Parkrun = 5,
  Address = 6
}

// CLUSTER PROPERTIES
export enum Cluster {
  Zoom = 6,
  Radius = 50
}

// NUMBER OF NEAREST PARKRUNS TO FIND
export const NUM_NEAREST = 3;

// LEGEND DETAILS
export const UNCLUSTERED_LEGEND = [
  { layer: 'Parkrun', colour: PointColours.ParkrunDefault },
  { layer: 'Nearby Parkrun', colour: PointColours.ParkrunNearest },
  { layer: 'Chosen Address', colour: PointColours.AddressDefault }
];
export const CLUSTERED_LEGEND = [
  ...UNCLUSTERED_LEGEND,
  { layer: '0-100 Parkruns', colour: PointColours.ParkrunClusteredFirstStep },
  {
    layer: '101-750 Parkruns',
    colour: PointColours.ParkrunClusteredSecondStep
  },
  { layer: '751+ Parkruns', colour: PointColours.ParkrunClusteredThirdStep }
];

// LAYER IDS
export enum LayerIDs {
  Parkrun = 'parkrun-unclustered-point',
  ParkrunInCluster = 'parkrun-unclustered-point-in-cluster',
  ParkrunCluster = 'parkrun-cluster',
  ParkrunClusterCount = 'parkrun-cluster-count',
  Address = 'address-layer'
}
