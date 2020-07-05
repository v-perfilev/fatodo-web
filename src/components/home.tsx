import * as React from 'react';
import {FC} from 'react';
import {compose} from 'recompose';
import withCentering from '../shared/hoc/with-centering';
import GroupCard from './groups/group-card/group-card';
import {TEST_GROUP} from './groups/_constants';

const Home: FC = () => (
  <div>
    Test
    {/*<GroupCard group={TEST_GROUP} />*/}
  </div>
);

export default compose(withCentering)(Home);
