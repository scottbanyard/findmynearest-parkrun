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

export const StyledTooltip = styled.div`
  && {
    z-index: 1000;
    position: absolute;
    background: white;
    padding: 5px;
    border: 1px solid rgba(240, 240, 240, 1);
  }
`;

export const StyledTooltipText = styled(Typography)`
&& {
  color: black;
  font-weight: 300;
  font-size: 11px;
  padding: 2px;
}
`;

export const GeocoderContainer = styled.div`
  margin-bottom: 40px;
`;
