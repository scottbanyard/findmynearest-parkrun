import { IGeocoderItem } from '../../components/Map/types';

const geocoderItem = {
  id: 'locality.10469306527303120',
  type: 'Feature',
  place_type: ['locality'],
  relevance: 1,
  properties: {
    id: 'locality.10469306527303120',
    name: 'Hyde Park, London, Greater London, England, United Kingdom',
    place_type: ['locality']
  },
  text: 'Hyde Park',
  place_name: 'Hyde Park, London, Greater London, England, United Kingdom',
  bbox: [
    -0.184908727962648,
    51.5115685746009,
    -0.160234273542044,
    51.5200974860518
  ],
  center: [-0.18, 51.52],
  geometry: {
    type: 'Point',
    coordinates: [-0.18, 51.52]
  },
  context: [
    {
      id: 'place.8780954591631530',
      wikidata: 'Q84',
      text: 'London'
    },
    {
      id: 'district.14664713661976620',
      wikidata: 'Q23306',
      text: 'Greater London'
    },
    {
      id: 'region.16980108045453920',
      short_code: 'GB-ENG',
      wikidata: 'Q21',
      text: 'England'
    },
    {
      id: 'country.10368356586814600',
      short_code: 'gb',
      wikidata: 'Q145',
      text: 'United Kingdom'
    }
  ]
} as IGeocoderItem;

export default geocoderItem;
