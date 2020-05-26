import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import withCentralContainer from './common/containers/with-central-container';

const Home: FC = () => <Box>Hello world!</Box>;

export default withCentralContainer(Home);
