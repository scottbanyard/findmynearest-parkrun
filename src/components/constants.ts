// MAP STYLE
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';

// PARKRUN GEOJSON URL
export const PARKRUN_GEOJSON_URL = 'https://images.parkrun.com/events.json';

// MAPBOX DIRECTIONS API
export const MAPBOX_DIRECTIONS_URL =
  'https://api.mapbox.com/directions/v5/mapbox';

// COLOURS - http://colorsafe.co/
export const PARKRUN_LAYER_DEFAULT_COLOUR = '#BAF73C';
export const PARKRUN_LAYER_NEAREST_COLOUR = '#ef4836';
export const ADDRESS_LAYER_DEFAULT_COLOUR = '#86e2d5';
export const PARKRUNS_CLUSTERED_FIRST_STEP_COLOUR = '#51bbd6';
export const PARKRUNS_CLUSTERED_SECOND_STEP_COLOUR = '#f1f075';
export const PARKRUNS_CLUSTERED_THIRD_STEP_COLOUR = '#f28cb1';

// POINT SIZES
export const PARKRUN_LAYER_SIZE = 5;
export const ADDRESS_LAYER_SIZE = 6;

// CLUSTER PROPERTIES
export const CLUSTER_ZOOM = 6;
export const CLUSTER_RADIUS = 50;
export const NUM_NEAREST = 3;

// LEGEND DETAILS
export const UNCLUSTERED_LEGEND = [
  { layer: 'Parkrun', colour: PARKRUN_LAYER_DEFAULT_COLOUR },
  { layer: 'Nearby Parkrun', colour: PARKRUN_LAYER_NEAREST_COLOUR },
  { layer: 'Chosen Address', colour: ADDRESS_LAYER_DEFAULT_COLOUR }
];
export const CLUSTERED_LEGEND = [
  ...UNCLUSTERED_LEGEND,
  { layer: '0-100 Parkruns', colour: PARKRUNS_CLUSTERED_FIRST_STEP_COLOUR },
  { layer: '101-750 Parkruns', colour: PARKRUNS_CLUSTERED_SECOND_STEP_COLOUR },
  { layer: '751+ Parkruns', colour: PARKRUNS_CLUSTERED_THIRD_STEP_COLOUR }
];
