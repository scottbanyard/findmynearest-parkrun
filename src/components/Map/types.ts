export interface IMapState {
  viewport: IViewport;
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
