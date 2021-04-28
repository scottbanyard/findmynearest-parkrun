import * as React from 'react';
import { Layer } from 'react-map-gl';
import {
  ADDRESS_LAYER_SIZE,
  ADDRESS_LAYER_DEFAULT_COLOUR
} from '../../../constants';

const AddressLayer = () => (
  <div>
    <Layer
      id="address-layer"
      type="circle"
      source="address-geojson"
      paint={{
        'circle-color': ADDRESS_LAYER_DEFAULT_COLOUR,
        'circle-radius': ADDRESS_LAYER_SIZE
      }}
    />
  </div>
);

export default AddressLayer;
