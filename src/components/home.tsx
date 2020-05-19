import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import {CentralBlock} from './common/blocks/central-block';

const Home: FC = () => <Box>Hello world!</Box>;

const WrappedHome: FC = () => (
  <CentralBlock>
    <Home />
  </CentralBlock>
);

export default WrappedHome;
// export default Home;
