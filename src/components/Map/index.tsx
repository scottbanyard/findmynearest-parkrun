import * as React from "react";
import ReactMapGL from 'react-map-gl';
import { IMapState, IViewport } from "./types";
import { Container, StyledGeolocateControl, StyledErrorTypography } from "./styles";
import axios from "axios";

const TOKEN = process.env.MAPBOX_TOKEN;

const defaultState: IMapState = {
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 2.8,
    bearing: 0,
    pitch: 0,
    width: "100%",
    height: "50vh",
  },
  error: undefined
}

export default class Map extends React.Component {
  state = defaultState;

  updateViewport = (viewport: IViewport) => {
    this.setState({
      viewport
    })
  }

  componentDidMount = async () => {
    try {
      const parkRunResponse = await axios.get("https://images.parkrun.com/events.json");
      console.log(parkRunResponse);
    } catch (e) {
      console.error(e);
      this.setState({ error: "Sorry, failed to fetch parkrun events. Try refreshing the page."})
    }

  }

  render() {
    const { viewport } = this.state;
    return (
      <div>
        {
          this.state.error && this.state.error.length > 0 ?
            (
              <StyledErrorTypography>{ this.state.error }</StyledErrorTypography>
            ) : null
        }
        <Container>
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
        </Container>
      </div>
    );
  }
}
