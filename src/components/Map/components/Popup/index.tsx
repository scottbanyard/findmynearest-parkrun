import * as React from 'react';
import { IPopupProps } from './types';
import { LayerIDs } from '../../../constants';
import { Feature } from 'geojson';
import { StyledTooltip, StyledTooltipText } from './styles';

const Popup = (props: IPopupProps) => {
  const { x, y, feature } = props;

  // Chooses which popup to display
  switch (feature.layer.id) {
    case LayerIDs.Parkrun:
    case LayerIDs.ParkrunInCluster:
      return renderParkrunPopup(feature, x, y);
    case LayerIDs.Address:
      return renderAddressPopup(feature, x, y);
    default:
      return null;
  }
};

// Renders an address layer pop-up
const renderAddressPopup = (feature: Feature, x: number, y: number) => {
  return (
    <StyledTooltip style={{ left: x, top: y }}>
      <StyledTooltipText>Address: {feature.properties.name}</StyledTooltipText>
    </StyledTooltip>
  );
};

// Renders a parkrun layer pop-up
const renderParkrunPopup = (feature: Feature, x: number, y: number) => {
  return (
    <StyledTooltip style={{ left: x, top: y }}>
      <StyledTooltipText>
        Name: {feature.properties.EventLongName}
      </StyledTooltipText>
      <StyledTooltipText>
        Location: {feature.properties.EventLocation}
      </StyledTooltipText>
      {feature.properties.distanceToAddress && (
        <StyledTooltipText>
          Distance: {feature.properties.distanceToAddress} meters
        </StyledTooltipText>
      )}
      {feature.properties.position > 0 && (
        <StyledTooltipText>
          Position: {feature.properties.position}
        </StyledTooltipText>
      )}
    </StyledTooltip>
  );
};

export default Popup;
