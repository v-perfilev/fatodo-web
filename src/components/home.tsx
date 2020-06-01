import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import {compose} from 'recompose';
import withCentering from '../shared/hoc/with-centering';

const Home: FC = () => <Box>Hello world!</Box>;

export default compose(withCentering)(Home);
