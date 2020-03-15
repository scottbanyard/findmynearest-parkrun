import * as React from "react";
import Map from "../Map"
import { Container, StyledTypography } from "./styles";

export const App = () => (
  <div>
    <Container>
      <StyledTypography>findmynearest parkrun</StyledTypography>
      <Map/>
    </Container>
  </div>
);
