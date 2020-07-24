import React, {FC, memo, useEffect, useState} from 'react';
import {Fab} from '@material-ui/core';
import {TEST_GROUP} from '../_constants';
import GroupsSortingGridContainer from './groups-sorting-grid-container';
import {CheckIcon} from '../../../shared/components/icons/check-icon';
import {CloseIcon} from '../../../shared/components/icons/close-icon';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {clearMenu, setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import {AdditionalMenuSpacer} from '../../layout/additional-menu/additional-menu';

const initGroups = Array.from(Array(10).keys()).map(() => {
  return TEST_GROUP;
});

const mapDispatchToProps = {setMenu, clearMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupsSorting: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

  const menu = (
    <>
      <AdditionalMenuSpacer />
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
    setMenu(menu);
  }, []);

  return <GroupsSortingGridContainer groups={groups} />;
};

export default compose(connector, memo)(GroupsSorting);
