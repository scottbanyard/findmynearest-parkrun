import * as React from "react";
import styled from "styled-components";
import Map from "../Map"

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

export const App = () => (
  <div>
    <Container>
      <Title>findmynearest parkrun</Title>
      <Map/>
    </Container>
  </div>
);
