import { GeoJSON } from "geojson";

export interface IMapState {
  viewport: IViewport;
  data: GeoJSON;
  hoveredFeature: any;
  error?: string;
  tooltipX?: number;
  tooltipY?: number;
}

export interface IViewport {
  latitude: number,
  longitude: number,
  zoom: number,
  bearing: number
  pitch: number
  width: number | string,
  height: number | string
}
