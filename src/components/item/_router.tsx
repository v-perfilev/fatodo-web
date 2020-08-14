import * as React from 'react';
import {FC} from 'react';
import {Redirect, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview/groups-preview';
import GroupsSorting from './groups-sorting/groups-sorting';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import AnimatedRouter from '../../shared/components/animated-router';
import Group from './group/group';

export enum GroupsRoutes {
  SORTING = '/sorting',
  GROUP = '/:groupId',
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <AnimatedRouter>
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupsRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute path={match.path + GroupsRoutes.GROUP} component={Group} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </AnimatedRouter>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu)(GroupRouter);
