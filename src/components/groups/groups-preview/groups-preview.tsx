import * as React from 'react';
import {FC, memo, useEffect, useState} from 'react';
import {Fab} from '@material-ui/core';
import GroupsGridContainer from './groups-grid-container';
import {TEST_GROUP} from '../_constants';
import {RotateIcon} from '../../../shared/components/icons/rotate-icon';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {GroupsRoutes} from '../_router';
import {connect, ConnectedProps} from 'react-redux';
import {clearMenu, setMenu} from '../../../store/actions/additional-menu.actions';
import {AdditionalMenuSpacer} from '../../layout/additional-menu/additional-menu';
import {ReorderIcon} from '../../../shared/components/icons/reorder-icon';

const initGroups = Array.from(Array(10).keys()).map(() => {
  return TEST_GROUP;
});

const mapDispatchToProps = {setMenu, clearMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupsPreview: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsSorting = (): void => history.push(Routes.GROUPS + GroupsRoutes.SORTING);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <Fab color="primary" onClick={redirectToGroupsSorting}>
        <ReorderIcon />
      </Fab>
    </>
  );

  useEffect(() => {
    setGroups(initGroups);
    setMenu(menu);
  }, []);

  return <GroupsGridContainer groups={groups} />;
};

export default compose(connector, memo)(GroupsPreview);
