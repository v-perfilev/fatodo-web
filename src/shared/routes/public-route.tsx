import * as React from 'react';
import {FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';

const PublicRoute: FC<RouteProps> = (props) => <Route {...props} />;

export default PublicRoute;
