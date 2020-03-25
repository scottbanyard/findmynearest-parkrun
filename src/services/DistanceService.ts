import { Point, FeatureCollection } from "geojson";
import { IGeocoderItem } from "../components/Map/types";
import { getDistance } from "geolib";

const NUM_NEAREST = parseInt(process.env.NUM_NEAREST, 10);
export default class DistanceService {

  /*
  * Calculate distance between 2 points (accuracy is to 1 meter)
  * @param point1 point A
  * @param point2 point B
  * @return the distance as a number
  **/
  static calculateDistance = (point1: Point, point2: Point): number => {
    const point1Coords = { latitude: point1.coordinates[1], longitude: point1.coordinates[0] };
    const points2Coords = { latitude: point2.coordinates[1], longitude: point2.coordinates[0] };
    const distance = getDistance(point1Coords, points2Coords);
    return distance;
  }

  /*
  * Calculate the nearest parkruns from an address using a defined distance threshold
  * @param address the selected address from the geocoder
  * @param parkruns the FeatureCollection of parkruns
  * @return a FeatureCollection of parkruns with new properties (distanceToAddress: number and closeParkrun: boolean)
  **/
  static getNearestParkruns = (address: IGeocoderItem, parkruns: FeatureCollection): any => {
    parkruns.features.forEach((f: any) => {
      const distance = DistanceService.calculateDistance(address.geometry, f.geometry);
      f.properties.distanceToAddress = distance;
      f.properties.closeParkrun = "false";
      f.properties.position = -1;
    });
    const sortedParkruns = DistanceService.sortParkruns(parkruns);
    const finalParkruns = DistanceService.identifyTop3Parkruns(sortedParkruns);
    return finalParkruns;
  }

  /*
  * Sort the parkruns features in ascending order of distance from address
  * @param parkruns the FeatureCollection of parkruns
  * @return a sorted FeatureCollection of parkruns
  **/
  static sortParkruns = (parkruns: FeatureCollection) => {
    parkruns.features.sort((a, b) => (a.properties.distanceToAddress > b.properties.distanceToAddress) ? 1 : -1);
    return parkruns;
  }

  /*
  * Identify the top three parkruns
  * @param sortedParkruns a sorted FeatureCollection of parkruns
  * @return a modified FeatureCollection where the property 'closeParkrun' = true for the nearest parkruns
  **/
  static identifyTop3Parkruns = (sortedParkruns: FeatureCollection) => {
    for (let i = 0; i < NUM_NEAREST; i++) {
      sortedParkruns.features[i].properties.closeParkrun = "true";
      sortedParkruns.features[i].properties.position = i + 1;
    }
    return sortedParkruns;
  }
}
