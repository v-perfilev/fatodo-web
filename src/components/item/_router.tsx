import * as React from 'react';
import {FC} from 'react';
import {Redirect, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';

import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import AnimatedRouter from '../../shared/routes/animated-router';
import ItemView from './item-view/item-view';

export enum ItemRoutes {
  ITEM = '/:itemId',
}

const ItemRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <AnimatedRouter>
      <PublicRoute path={match.path + ItemRoutes.ITEM} component={ItemView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </AnimatedRouter>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu)(ItemRouter);
