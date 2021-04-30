import styled from 'styled-components';
import { Typography } from '@material-ui/core';

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
