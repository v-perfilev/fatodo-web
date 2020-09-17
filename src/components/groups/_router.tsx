import * as React from 'react';
import {FC} from 'react';
import {Redirect, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview';
import GroupsSorting from './groups-sorting';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import AnimatedRouter from '../../shared/routes/animated-router';
import GroupView from './group-view';
import GroupCreate from './group-create';
import GroupEdit from './group-edit';

export enum GroupRoutes {
  SORTING = '/sorting',
  CREATE = '/create',
  EDIT = '/edit/:groupId',
  VIEW = '/:groupId',
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <AnimatedRouter>
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute path={match.path + GroupRoutes.CREATE} component={GroupCreate} />
      <PublicRoute path={match.path + GroupRoutes.EDIT} component={GroupEdit} />
      <PublicRoute path={match.path + GroupRoutes.VIEW} component={GroupView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </AnimatedRouter>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu)(GroupRouter);
