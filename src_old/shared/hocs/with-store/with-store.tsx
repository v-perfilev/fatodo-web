import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import store from '../../../store/store';
import {Provider} from 'react-redux';

const withStore = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default withStore;
