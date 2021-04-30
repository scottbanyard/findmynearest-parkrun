import axios from 'axios';
import { URLs } from '../components/constants';

export default class ParkrunService {
  /*
   * Retrieve a Parkrun GeoJSON which lists features for all parkruns in the world
   **/
  static getParkruns = async () => {
    try {
      const parkRunResponse = await axios.get(URLs.ParkrunGeoJSON);
      return parkRunResponse && parkRunResponse.data
        ? parkRunResponse.data.events
        : null;
    } catch (e) {
      throw e;
    }
  };
}
