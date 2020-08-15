import * as React from 'react';
import {FC} from 'react';
import {Redirect, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview/group-preview';
import GroupsSorting from './groups-sorting/groups-sorting';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import AnimatedRouter from '../../shared/routes/animated-router';
import GroupView from './group-view/group-view';

export enum GroupRoutes {
  SORTING = '/sorting',
  GROUP = '/:groupId',
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <AnimatedRouter>
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute path={match.path + GroupRoutes.GROUP} component={GroupView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </AnimatedRouter>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu)(GroupRouter);
