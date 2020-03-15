export interface IMapState {
  viewport: IViewport;
  error?: string;
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
