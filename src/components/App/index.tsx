import * as React from 'react';
import Title from '../Title';
import Map from '../Map';
import { Container } from './styles';

export const App = () => (
  <div>
    <Container>
      <Title />
      <Map />
    </Container>
  </div>
);
