import * as React from 'react';
import {FC} from 'react';
import {Switch, useRouteMatch} from 'react-router-dom';
import PageNotFound from '../static/page-not-found';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview/groups-preview';
import GroupsSorting from './groups-sorting/groups-sorting';
import {useTransition} from 'react-spring';

export enum GroupsRoutes {
  SORTING = '/sorting',
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {opacity: 0, width: '0%'},
    enter: {opacity: 1, width: '100%'},
    leave: {opacity: 0, width: '0%'},
  });

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupsRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute component={PageNotFound} />
    </Switch>
  );
};

export default GroupRouter;
