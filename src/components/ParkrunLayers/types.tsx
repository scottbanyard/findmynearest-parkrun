import { FeatureCollection } from "geojson";

export interface IParkrunLayersProps {
  cluster: boolean;
  parkrunData: FeatureCollection;
}
