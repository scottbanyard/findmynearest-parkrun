import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { ILegendColour } from './types';

export const LegendContainer = styled.div`
  background: white;
  border: black;
  border-radius: 7px;
  border-style: solid;
  border-width: 1.2px;
  padding: 10px;
  width: 100%;
  margin-top: 12px;
`;

export const LegendTypography = styled(Typography)`
  && {
    text-align: center;
    font-weight: 300;
    margin-bottom: 7px;
    font-size: 13px;
  }
`;

export const LegendRowContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LegendColour = styled.div`
  background-color: ${(p: ILegendColour) => p.colour};
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 9px;
  margin-top: 5px;
`;
