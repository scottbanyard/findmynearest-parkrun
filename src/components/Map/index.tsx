import * as React from "react";
import ReactMapGL, { Source, Layer } from 'react-map-gl';
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
    height: "50vh"
  },
  error: undefined,
  data: null
}

export default class Map extends React.Component {
  readonly state = defaultState;

  updateViewport = (viewport: IViewport) => {
    this.setState({
      viewport
    })
  }

  componentDidMount = async () => {
    try {
      const parkRunResponse = await axios.get("https://images.parkrun.com/events.json");
      console.log(parkRunResponse.data);
      this.setState({
        data: parkRunResponse && parkRunResponse.data ? parkRunResponse.data.events : null
      })
    } catch (e) {
      console.error(e);
      this.setState({ error: "Sorry, failed to fetch parkrun events. Try refreshing the page."})
    }

  }

  render() {
    const { viewport, data } = this.state;
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
              <Source id="parkrun-geojson" type="geojson" data={data as any}>
                <Layer
                  id="parkrun-layer"
                  type="circle"
                  source="parkrun-geojson"
                  paint={{
                    "circle-color": "#f00",
                    "circle-radius": 4
                  }}
                />
              </Source>
          </ReactMapGL>
        </Container>
      </div>
    );
  }
}
