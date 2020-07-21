import React, {FC, useEffect, useState} from 'react';
import {Fab} from '@material-ui/core';
import {TEST_GROUP} from '../_constants';
import GroupsSortingGridContainer from './groups-sorting-grid-container';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import withDrawerMenu, {DrawerProps, DrawerSpacer} from '../../../shared/hoc/with-drawer-menu';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';

const initGroups = Array.from(Array(30).keys()).map(() => {
  return TEST_GROUP;
});

type Props = DrawerProps;

const GroupsSorting: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

  const Menu: FC = () => (
    <>
      <DrawerSpacer />
      <Fab color="primary">
        <CheckIcon />
      </Fab>
      <Fab color="secondary" onClick={redirectToGroupsRoot}>
        <CloseIcon />
      </Fab>
    </>
  );

  useEffect(() => {
    setGroups(initGroups);
    setMenu(Menu);
  }, []);

  return <GroupsSortingGridContainer groups={groups} />;
};

export default compose(withDrawerMenu)(GroupsSorting);
