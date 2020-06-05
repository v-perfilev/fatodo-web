import * as React from 'react';
import {FC} from 'react';

import Router from './router';
import withLoading from '../shared/hoc/with-loading';
import {compose} from 'recompose';
import {hot} from 'react-hot-loader';
import withWrapper from '../shared/hoc/with-wrapper';
import withDevelopmentRibbon from '../shared/hoc/with-development-ribbon';

const App: FC = () => <Router />;

export default compose(hot(module), withDevelopmentRibbon, withLoading, withWrapper)(App);
