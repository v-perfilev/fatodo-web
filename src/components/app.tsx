import * as React from 'react';
import {FC} from 'react';

import Router from './router';
import withLoading from '../shared/hoc/with-loading';
import {compose} from 'recompose';
import {hot} from 'react-hot-loader';
import withWrapper from '../shared/hoc/with-wrapper';

const App: FC = () => <Router />;

export default compose(hot(module), withLoading, withWrapper)(App);
