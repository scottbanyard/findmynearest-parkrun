import * as React from "react";
import ReactMapGL, { Source, Layer, NavigationControl, PointerEvent } from 'react-map-gl';
import { IMapState, IViewport, IGeocoderItem } from "./types";
import { Container, StyledGeolocateControl, StyledErrorTypography, NavContainer, StyledTooltip, StyledTooltipText, GeocoderContainer, StyledTypography } from "./styles";
import axios from "axios";
// @ts-ignore
import Geocoder from 'react-mapbox-gl-geocoder';
import "./styles.css";

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
  data: null,
  hoveredFeature: null,
  tooltipX: null,
  tooltipY: null,
  selectedAddress: undefined
}

export default class Map extends React.Component {
  readonly state = defaultState;

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

  updateViewport = (viewport: IViewport) => {
    this.setState({
      viewport
    })
  }

  onHover = (event: PointerEvent) => {
    const { features, srcEvent } = event;
    const hoveredFeature = features && features.find((f: any) => f.layer.id === "parkrun-layer");
    this.setState({
      hoveredFeature,
      tooltipX: srcEvent.offsetX,
      tooltipY: srcEvent.offsetY
    })
  }

  renderTooltip = () => {
    const { hoveredFeature, tooltipX, tooltipY } = this.state;
    return (
      hoveredFeature && this.validateTooltipCoords(tooltipX, tooltipY) && (
        <StyledTooltip style={{left: tooltipX, top: tooltipY}}>
          <StyledTooltipText>Name: { hoveredFeature.properties.EventLongName }</StyledTooltipText>
          <StyledTooltipText>Location: { hoveredFeature.properties.EventLocation }</StyledTooltipText>
        </StyledTooltip>
      )
    );
  }

  validateTooltipCoords = (x: number, y: number) => {
    return (x > 3 || x < -3) && (y > 3 || y < -3);
  }

  onSelectAddress = (viewport: IViewport, item: IGeocoderItem) => {
    this.updateViewport({ ...this.state.viewport, ...viewport });
    this.setState({ selectedAddress: item })
    console.log("Selected address: ", item);
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
          <GeocoderContainer>
            <StyledTypography>enter and select address</StyledTypography>
            <Geocoder
              mapboxApiAccessToken={ TOKEN }
              onSelected={ this.onSelectAddress }
              hideOnSelect={ true }
              viewport={ viewport }
              updateInputOnSelect={ true }
              transitionDuration={ 3000 }
            />
          </GeocoderContainer>
          <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={ TOKEN }
            onHover={ this.onHover }
            onViewportChange={ this.updateViewport }>
              <NavContainer>
                <NavigationControl/>
              </NavContainer>
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
                    "circle-color": "#308be6",
                    "circle-radius": 5
                  }}
                />
              </Source>
              { this.renderTooltip() }
          </ReactMapGL>
        </Container>
      </div>
    );
  }
}
