import { GeoJSON } from "geojson";

export interface IMapState {
  viewport: IViewport;
  error?: string;
  data?: GeoJSON;
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
