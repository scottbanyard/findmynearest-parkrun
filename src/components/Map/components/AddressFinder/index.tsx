import * as React from 'react';
// @ts-ignore
import Geocoder from 'react-mapbox-gl-geocoder';
import { IAddressFinderProps } from './types';
import { GeocoderContainer, StyledTypography } from './styles';

const TOKEN = process.env.MAPBOX_TOKEN;

const AddressFinder = (props: IAddressFinderProps) => (
  <GeocoderContainer>
    <StyledTypography>enter and select an address</StyledTypography>
    <Geocoder
      mapboxApiAccessToken={TOKEN}
      onSelected={props.onSelectAddress}
      hideOnSelect={true}
      viewport={props.viewport}
      updateInputOnSelect={true}
      transitionDuration={3000}
    />
  </GeocoderContainer>
);

export default AddressFinder;
