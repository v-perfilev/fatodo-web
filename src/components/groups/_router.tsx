import * as React from 'react';
import {FC} from 'react';
import {Switch, useRouteMatch} from 'react-router-dom';
import PageNotFound from '../static/page-not-found';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview/groups-preview';
import GroupsSorting from './groups-sorting/groups-sorting';

export enum GroupsRoutes {
  SORTING = '/sorting',
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupsRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute component={PageNotFound} />
    </Switch>
  );
};

export default GroupRouter;
