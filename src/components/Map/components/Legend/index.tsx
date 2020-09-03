import * as React from "react";
import { ILegendProps } from "./types";
import { LegendTypography, LegendContainer, LegendRowContainer, LegendColour } from "./styles";
import { PARKRUN_LAYER_DEFAULT_COLOUR, PARKRUN_LAYER_NEAREST_COLOUR, ADDRESS_LAYER_DEFAULT_COLOUR, PARKRUNS_CLUSTERED_FIRST_STEP_COLOUR, PARKRUNS_CLUSTERED_SECOND_STEP_COLOUR, PARKRUNS_CLUSTERED_THIRD_STEP_COLOUR, CLUSTERED_LEGEND, UNCLUSTERED_LEGEND } from "../../../constants";

const Legend = (props: ILegendProps) => {

  const legendMap = props.cluster ? CLUSTERED_LEGEND : UNCLUSTERED_LEGEND;

  return (
    <div>
      <LegendContainer>
        {
          legendMap.map((p) => {
            return (
              <LegendRowContainer>
                <LegendColour colour={p.colour}/>
                <LegendTypography>{ p.layer }</LegendTypography>
              </LegendRowContainer>
            )
          })
        }
      </LegendContainer>
    </div>
  )
}

export default Legend;
