import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const GeocoderContainer = styled.div`
  margin-bottom: 40px;
`;

export const StyledTypography = styled(Typography)`
  && {
    text-align: center;
    font-weight: 300;
    margin-bottom: 7px;
    font-size: 16px;
  }
`;
