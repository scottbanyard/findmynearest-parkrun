import styled from "styled-components";
import { GeolocateControl } from "react-map-gl";
import { Typography } from "@material-ui/core"
export const Container = styled.div`
  margin-top: 40px;
`;

export const StyledGeolocateControl = styled(GeolocateControl)`
  position: absolute;
  top: 0;
  right: 0;
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
