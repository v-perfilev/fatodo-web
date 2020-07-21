import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Fab} from '@material-ui/core';
import GroupsGridContainer from './groups-grid-container';
import {TEST_GROUP} from '../_constants';
import {RotateIcon} from '../../common/icons/rotate-icon';
import withDrawerMenu, {DrawerProps, DrawerSpacer} from '../../../shared/hoc/with-drawer-menu';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {GroupsRoutes} from '../_router';

const initGroups = Array.from(Array(30).keys()).map(() => {
  return TEST_GROUP;
});

type Props = DrawerProps;

const GroupsPreview: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsSorting = (): void => history.push(Routes.GROUPS + GroupsRoutes.SORTING);

  const Menu: FC = () => (
    <>
      <DrawerSpacer />
      <Fab color="primary" onClick={redirectToGroupsSorting}>
        <RotateIcon />
      </Fab>
    </>
  );

  useEffect(() => {
    setGroups(initGroups);
    setMenu(Menu);
  }, []);

  return <GroupsGridContainer groups={groups} />;
};

export default compose(withDrawerMenu)(GroupsPreview);
