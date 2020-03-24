import { GeoJSON, Point, Feature } from "geojson";

export interface IMapState {
  viewport: IViewport;
  data: GeoJSON;
  hoveredParkrunFeature: Feature;
  hoveredAddressFeature: Feature;
  error?: string;
  tooltipX?: number;
  tooltipY?: number;
  selectedAddress?: IGeocoderItem;
}

export interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  width: number | string;
  height: number | string;
  altitude?: number;
  maxZoom?: number;
  minZoom?: number;
  maxPitch?: number;
  minPitch?: number;
  transitionDuration?: any;
  transitionEasing?: any;
  transitionInterpolator?: any;
  transitionInterruption?: any
}

export interface IGeocoderItem {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: IGeocoderProperties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Point;
  context: IContextItem[];
}

interface IGeocoderProperties {
  wikidata?: string;
  name: string;
  id: string;
  place_type: string[];
}

interface IContextItem {
  id: string;
  short_code?: string;
  wikidata?: string;
  text?: string;
}
