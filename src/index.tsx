import * as React from 'react';
import ReactDOM from 'react-dom';
import {initI18n} from './shared/i18n';
import {BrowserRouter as Router} from 'react-router-dom';
import {flowRight} from 'lodash';
import {Box, CssBaseline} from '@mui/material';

// import styles
import 'react-image-crop/dist/ReactCrop.css';
import './styles.css';

// import translations
import './shared/i18n';

// setup axios

const Root = () => (
  <Router>
    <CssBaseline />
    <Box>Test</Box>
  </Router>
);

const WrappedRoot = flowRight([
  // withStore,
  // withDefaultTheme,
  // withMui,
  // withSnack,
  // withWsClient,
  // withChat,
  // withContactInfo,
  // withContacts,
  // withDialogs,
])(Root);

const root = document.getElementById('root');
initI18n.then(() => {
  ReactDOM.render(<WrappedRoot />, root);
});
