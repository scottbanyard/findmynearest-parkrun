import * as React from 'react';
import { IClusterToggleProps } from './types';
import Switch from '@material-ui/core/Switch';
import { StyledFormControlLabel } from './styles';

const ClusterToggle = (props: IClusterToggleProps) => (
  <StyledFormControlLabel
    control={
      <Switch
        checked={props.clusterOn}
        onChange={props.onClusterToggle}
        name="clusterToggle"
        color="primary"
        inputProps={{ 'aria-label': 'Toggle Cluster' }}
      />
    }
    label="cluster"
    labelPlacement="start"
  />
);

export default ClusterToggle;
