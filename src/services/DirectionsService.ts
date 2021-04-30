import axios from 'axios';
import { URLs } from '../components/constants';
// https://api.mapbox.com/directions/v5/mapbox/walking/-0.06507%2C51.50893%3B-0.0358%2C51.5223?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1Ijoic2NvdHRiYW55YXJkIiwiYSI6ImNrNzdyMXhxaDAzc3AzZG1wazlnNXd5MTYifQ.VsYKGqQ7jR8gjSpv27Mb-g

const TOKEN = process.env.MAPBOX_TOKEN;

export default class DirectionsService {
  /*
   * Retrieve a GeoJSON polyline which routes you from an address to a parkrun
   * @param method walking, cycling, driving
   * @param address the geocoded feature in GeoJSON format
   * @param parkrun a single parkrun feature in GeoJSON format
   **/
  static getDirections = async (method: string, address: any, parkrun: any) => {
    const response = await axios.get(`${URLs.MapboxDirections}/${method}/${address.geometry.coordinates[0]}
      %2C${address.geometry.coordinates[1]}%3B${parkrun.geometry.coordinates[0]}%2C${parkrun.geometry.coordinates[1]}
      ?alternatives=true&geometres=geojson&steps=true&access_token=${TOKEN}`);
    console.log(response);
  };
}
