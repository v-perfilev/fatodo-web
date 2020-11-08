import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {LastLocationProvider} from 'react-router-last-location';

const withLastLocation = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <LastLocationProvider>
      <Component {...props} />
    </LastLocationProvider>
  );
};

export default withLastLocation;
