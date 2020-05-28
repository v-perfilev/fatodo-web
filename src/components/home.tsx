import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import {compose} from 'redux';
import withCentralContainer from './common/hoc/with-central-container';

const Home: FC = () => <Box>Hello world!</Box>;

const composer = compose(withCentralContainer);
export default composer(Home);
