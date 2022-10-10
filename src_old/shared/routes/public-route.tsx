import * as React from 'react';
import {FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';

type Props = RouteProps;

const PublicRoute: FC<Props> = (props: Props) => {
  return <Route {...props} />;
};

export default PublicRoute;
