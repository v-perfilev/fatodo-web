import * as React from 'react';
import {FC} from 'react';
import {RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import PageNotFound from '../static/page-not-found';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import Groups from '../groups/groups';

type Props = RouteComponentProps;

const GroupRouter: FC<Props> = ({match}: Props) => (
  <Switch>
    <PublicRoute exact path={match.path} component={Groups} />
    {/*Errors*/}
    <PublicRoute component={PageNotFound} />
  </Switch>
);

export default compose(withRouter)(GroupRouter);
