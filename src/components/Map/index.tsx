import * as React from "react";
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import styled from "styled-components";
import { IMapState, IViewport } from "./types";

const TOKEN = 'pk.eyJ1Ijoic2NvdHRiYW55YXJkIiwiYSI6ImNrNzdyMXhxaDAzc3AzZG1wazlnNXd5MTYifQ.VsYKGqQ7jR8gjSpv27Mb-g';

const defaultState: IMapState = {
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 2.8,
    bearing: 0,
    pitch: 0,
    width: "80vw",
    height: "50vh"
  }
}

const StyledGeolocateControl = styled(GeolocateControl)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

export default class Map extends React.Component {
  state = defaultState;

  updateViewport = (viewport: IViewport) => {
    this.setState({
      viewport
    })
  }

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={ TOKEN }
        onViewportChange={ this.updateViewport }>
          <StyledGeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={ true }
          />
      </ReactMapGL>
    );
  }
}
