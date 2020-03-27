import * as React from "react";
import ReactMapGL, { Source, Layer, NavigationControl, PointerEvent } from 'react-map-gl';
import { IMapState, IViewport, IGeocoderItem } from "./types";
import { Container, StyledGeolocateControl, StyledErrorTypography, NavContainer, StyledTooltip, StyledTooltipText, GeocoderContainer, StyledTypography } from "./styles";
import axios from "axios";
// @ts-ignore
import Geocoder from 'react-mapbox-gl-geocoder';
import "./styles.css";
import { Feature, FeatureCollection } from "geojson";
import DistanceService from "../../services/DistanceService";
import DirectionsService from "../../services/DirectionsService";
import ParkrunLayers from "../ParkrunLayers";
import AddressLayer from "../AddressLayer";
import { MAP_STYLE, ADDRESS_LAYER_DEFAULT_COLOUR, ADDRESS_LAYER_SIZE, PARKRUN_GEOJSON_URL, CLUSTER_RADIUS, CLUSTER_ZOOM } from "../constants";

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
  parkrunData: null,
  hoveredParkrunFeature: null,
  hoveredAddressFeature: null,
  tooltipX: null,
  tooltipY: null,
  selectedAddress: null,
  clusterOn: true
}

export default class Map extends React.Component {
  readonly state = defaultState;

  componentDidMount = async () => {
    try {
      const parkRunResponse = await axios.get(PARKRUN_GEOJSON_URL);
      console.log(parkRunResponse.data);
      this.setState({
        parkrunData: parkRunResponse && parkRunResponse.data ? parkRunResponse.data.events : null
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
    const hoveredParkrunFeature = features && features.find((f: any) => f.layer.id === "parkrun-unclustered-point");
    const hoveredAddressFeature = features && features.find((f: any) => f.layer.id === "address-layer");

    this.setState({
      hoveredParkrunFeature,
      hoveredAddressFeature,
      tooltipX: srcEvent.offsetX,
      tooltipY: srcEvent.offsetY
    })
  }

  validateTooltipCoords = (x: number, y: number) => {
    return (x > 3 || x < -3) && (y > 3 || y < -3);
  }

  calculateClosestParkruns = () => {
    const { selectedAddress, parkrunData } = this.state;
    const closestParkruns = DistanceService.getNearestParkruns(selectedAddress, parkrunData);
    console.log(closestParkruns);
    return closestParkruns;
  }

  calculateRoutes = async (item: IGeocoderItem, parkruns: Feature[]) => {
    try {
      const promises = parkruns.map((p) => DirectionsService.getDirections("walking", item, p));
      const routeResponses = await Promise.all(promises);
      console.log(routeResponses);
    } catch (e) {
      console.error(e);
    }
  }

  // Put properties of the geocoded item into the properties attribute
  modifyAddressProperties = (item: IGeocoderItem): IGeocoderItem => {
    item.properties.id = item.id;
    item.properties.name = item.place_name;
    item.properties.place_type = item.place_type;
    return item;
  }

  onSelectAddress = (viewport: IViewport, item: IGeocoderItem) => {
    this.resetError();
    this.updateViewport({ ...this.state.viewport, ...viewport });
    const address = this.modifyAddressProperties(item);
    this.setState({ selectedAddress: item }, () => {
        this.setNearestParkruns();
    });
  }

  setNearestParkruns = () => {
    try {
      const closestParkruns = this.calculateClosestParkruns();
      // force refresh of layer
      this.setState({ parkrunData: null }, () => {
        this.setState({ parkrunData: closestParkruns })
      });

      // const routes = await this.calculateRoutes(item, closestParkruns);
    } catch (e) {
      console.error(e);
      this.setState({ error: "Sorry, failed to fetch your nearest parkruns. Try refreshing the page."})
    }
  }

  resetError = () => {
    this.setState({ error: undefined });
  }

  renderTooltip = () => {
    const { hoveredParkrunFeature, hoveredAddressFeature, tooltipX, tooltipY } = this.state;
    return (
      (hoveredParkrunFeature || hoveredAddressFeature) && this.validateTooltipCoords(tooltipX, tooltipY) && (
        <StyledTooltip style={{left: tooltipX, top: tooltipY}}>
          { hoveredParkrunFeature ? this.renderParkrunTooltip(hoveredParkrunFeature) :
            hoveredAddressFeature ? this.renderAddressTooltip(hoveredAddressFeature) : null }
        </StyledTooltip>
      )
    );
  }

  renderAddressTooltip = (hoveredFeature: Feature) => {
    return (
      <div>
        <StyledTooltipText>ID: { hoveredFeature.properties.id }</StyledTooltipText>
        <StyledTooltipText>Name: { hoveredFeature.properties.name }</StyledTooltipText>
      </div>
    );
  }

  renderParkrunTooltip = (hoveredFeature: Feature) => {
    return (
      <div>
        <StyledTooltipText>Name: { hoveredFeature.properties.EventLongName }</StyledTooltipText>
        <StyledTooltipText>Location: { hoveredFeature.properties.EventLocation }</StyledTooltipText>
        { hoveredFeature.properties.distanceToAddress ? (
          <StyledTooltipText>Distance: { hoveredFeature.properties.distanceToAddress } meters</StyledTooltipText>
        ) : null }
        { hoveredFeature.properties.position > 0 ? (
          <StyledTooltipText>Position: { hoveredFeature.properties.position }</StyledTooltipText>
        ) : null }
      </div>
    );
  }

  render() {
    const { viewport, parkrunData, selectedAddress, clusterOn } = this.state;
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
            mapStyle={ MAP_STYLE }
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

              <Source id="parkrun-geojson" type="geojson" data={parkrunData} cluster={clusterOn} clusterMaxZoom={CLUSTER_ZOOM} clusterRadius={CLUSTER_RADIUS}>
                <ParkrunLayers cluster={ clusterOn } />
              </Source>

              <Source id="address-geojson" type="geojson" data={selectedAddress as any}>
                <AddressLayer />
              </Source>

              { this.renderTooltip() }

          </ReactMapGL>
        </Container>
      </div>
    );
  }
}
