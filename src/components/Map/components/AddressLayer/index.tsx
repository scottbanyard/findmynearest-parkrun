import * as React from 'react';
import { Layer } from 'react-map-gl';
import { PointColours, LayerIDs, PointSizes } from '../../../constants';

const AddressLayer = () => (
  <div>
    <Layer
      id={LayerIDs.Address}
      type="circle"
      source="address-geojson"
      paint={{
        'circle-color': PointColours.AddressDefault,
        'circle-radius': PointSizes.Address
      }}
    />
  </div>
);

export default AddressLayer;
