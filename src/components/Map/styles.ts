import styled from 'styled-components';
import { GeolocateControl } from 'react-map-gl';
import { Typography, FormControlLabel } from '@material-ui/core';

export const Container = styled.div`
  margin-top: 40px;
  position: relative;
`;

export const StyledGeolocateControl = styled(GeolocateControl)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

export const StyledTopRightContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  margin-right: 30px;
  margin-top: 15px;
`;

export const NavContainer = styled.div`
  position: absolute;
  left: 0;
  margin: 10px;
`;

export const StyledErrorTypography = styled(Typography)`
  && {
    color: red;
    text-align: center;
    font-size: 13px;
    font-weight: 300;
    margin-top: 10px;
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    text-align: center;
    font-weight: 300;
    margin-bottom: 7px;
    font-size: 16px;
  }
`;

export const GeocoderContainer = styled.div`
  margin-bottom: 40px;
`;

export const MapContainer = styled.div`
  padding-top: 30px;
`;
