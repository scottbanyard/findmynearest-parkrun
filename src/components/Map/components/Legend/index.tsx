import * as React from 'react';
import { ILegendProps } from './types';
import {
  LegendTypography,
  LegendContainer,
  LegendRowContainer,
  LegendColour
} from './styles';
import { CLUSTERED_LEGEND, UNCLUSTERED_LEGEND } from '../../../constants';

const Legend = (props: ILegendProps) => {
  const legendMap = props.cluster ? CLUSTERED_LEGEND : UNCLUSTERED_LEGEND;

  return (
    <div>
      <LegendContainer>
        {legendMap.map((p) => {
          return (
            <LegendRowContainer>
              <LegendColour colour={p.colour} />
              <LegendTypography>{p.layer}</LegendTypography>
            </LegendRowContainer>
          );
        })}
      </LegendContainer>
    </div>
  );
};

export default Legend;
