import * as React from 'react';
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  PointerEvent
} from 'react-map-gl';
import { IMapState, IViewport, IGeocoderItem } from './types';
import {
  Container,
  StyledErrorTypography,
  NavContainer,
  StyledTopRightContainer,
  MapContainer
} from './styles';
import './styles.css';
import { Feature, FeatureCollection } from 'geojson';
import DistanceService from '../../services/DistanceService';
import DirectionsService from '../../services/DirectionsService';
import ParkrunService from '../../services/ParkrunService';
import {
  ParkrunLayers,
  AddressLayer,
  Legend,
  Popup,
  ClusterToggle,
  AddressFinder
} from './components';
import { MAP_STYLE, URLs, LayerIDs } from '../constants';

const TOKEN = process.env.MAPBOX_TOKEN;

const defaultState: IMapState = {
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 2.8,
    bearing: 0,
    pitch: 0,
    width: '100%',
    height: '70vh'
  },
  error: undefined,
  parkrunData: null,
  clickedFeature: null,
  tooltipX: null,
  tooltipY: null,
  selectedAddress: null,
  clusterOn: false
};

export default class Map extends React.Component {
  readonly state = defaultState;

  // On mount, retrieve all of the parkrun data and set to state
  componentDidMount = async () => {
    try {
      const parkruns = await ParkrunService.getParkruns();
      this.setState({ parkrunData: parkruns });
    } catch (e) {
      console.error(e);
      this.setState({
        error: 'Sorry, failed to fetch parkrun events. Try refreshing the page.'
      });
    }
  };

  // Update the viewport everytime we move the map
  updateViewport = (viewport: IViewport) => {
    this.setState({
      viewport
    });
  };

  // React-Map-GL's onHover - render tooltips / pop-ups on features when hovered
  onHover = (event: PointerEvent) => {
    const { features, srcEvent } = event;
    if (features) {
      const clickedFeature = features[0];
      if (this.validateTooltipCoords(srcEvent.offsetX, srcEvent.offsetY)) {
        this.setState({
          clickedFeature,
          tooltipX: srcEvent.offsetX,
          tooltipY: srcEvent.offsetY
        });
      }
    }
  };

  // React-Map-GL can sometimes return the mouse pointer at the wrong location
  // and tell us it in the top left corner of the map (which is incorrect) -
  // don't render these anonamalies
  validateTooltipCoords = (x: number, y: number) => {
    return (x > 15 || x < -15) && (y > 15 || y < -15);
  };

  // Returns the closest parkruns to the address in state
  calculateClosestParkruns = () => {
    const { selectedAddress, parkrunData } = this.state;
    const closestParkruns = DistanceService.getNearestParkruns(
      selectedAddress,
      parkrunData
    );
    console.log(closestParkruns);
    return closestParkruns;
  };

  // Calculate the routes to the given parkruns
  calculateRoutes = async (item: IGeocoderItem, parkruns: Feature[]) => {
    try {
      const promises = parkruns.map((p) =>
        DirectionsService.getDirections('walking', item, p)
      );
      const routeResponses = await Promise.all(promises);
      console.log(routeResponses);
    } catch (e) {
      console.error(e);
    }
  };

  // Put properties of the geocoded item into the properties attribute
  modifyAddressProperties = (item: IGeocoderItem): IGeocoderItem => {
    item.properties.id = item.id;
    item.properties.name = item.place_name;
    item.properties.place_type = item.place_type;
    return item;
  };

  // Selecting an address in the geocoder will search for nearest parkruns
  onSelectAddress = (viewport: IViewport, item: IGeocoderItem) => {
    this.resetError();
    this.updateViewport({ ...this.state.viewport, ...viewport });
    const address = this.modifyAddressProperties(item);
    this.setState({ selectedAddress: item }, () => {
      this.setNearestParkruns();
    });
  };

  // Finds the closest parkruns and renders them correctly
  setNearestParkruns = () => {
    try {
      const closestParkruns = this.calculateClosestParkruns();
      // force refresh of layer
      this.setState({ parkrunData: null }, () => {
        this.setState({ parkrunData: closestParkruns });
      });

      // const routes = await this.calculateRoutes(item, closestParkruns);
    } catch (e) {
      console.error(e);
      this.setState({
        error:
          'Sorry, failed to fetch your nearest parkruns. Try refreshing the page.'
      });
    }
  };

  // Resets the error state
  resetError = () => {
    this.setState({ error: undefined });
  };

  // Renders the pop-up for the hovered feature; need to render different fields
  // for different layers (parkrun vs an address layer)
  renderMarkerPopup = () => {
    const { clickedFeature, tooltipX, tooltipY } = this.state;
    if (clickedFeature && clickedFeature.layer && clickedFeature.layer.id) {
      return <Popup x={tooltipX} y={tooltipY} feature={clickedFeature} />;
    }
  };

  // Renders the legend - this can differ dependening if the user has clustered
  renderLegend = () => <Legend cluster={this.state.clusterOn} />;

  // Renders the cluster toggle
  renderClusterToggle = () => (
    <ClusterToggle
      clusterOn={this.state.clusterOn}
      onClusterToggle={this.handleClusterToggle}
    />
  );

  // Turn the cluster toggle on and off
  handleClusterToggle = () => {
    this.setState({ clusterOn: !this.state.clusterOn });
  };

  // Renders the GeoJSON layers (aka the Parkrun and Address data points)
  renderLayers = () => (
    <div>
      <ParkrunLayers
        cluster={this.state.clusterOn}
        parkrunData={this.state.parkrunData}
      />
      <Source
        id="address-geojson"
        type="geojson"
        data={this.state.selectedAddress as any}
      >
        <AddressLayer />
      </Source>
    </div>
  );

  render() {
    return (
      <div>
        {this.state.error && this.state.error.length && (
          <StyledErrorTypography>{this.state.error}</StyledErrorTypography>
        )}
        <Container>
          <AddressFinder
            onSelectAddress={this.onSelectAddress}
            viewport={this.state.viewport}
          />
          <MapContainer>
            <ReactMapGL
              {...this.state.viewport}
              mapStyle={MAP_STYLE}
              mapboxApiAccessToken={TOKEN}
              onHover={this.onHover}
              onViewportChange={this.updateViewport}
            >
              <NavContainer>
                <NavigationControl />
              </NavContainer>

              <StyledTopRightContainer>
                {this.renderClusterToggle()}
                {this.renderLegend()}
              </StyledTopRightContainer>

              {this.renderLayers()}
              {this.renderMarkerPopup()}
            </ReactMapGL>
          </MapContainer>
        </Container>
      </div>
    );
  }
}
