import React, {memo, useCallback} from 'react';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions} from '../../../store/groups/groupsActions';
import FHStack from '../../../components/boxes/FHStack';
import {IconButton, Typography} from '@mui/material';
import PageHeader from '../../../components/layouts/PageHeader';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import PlusIcon from '../../../components/icons/PlusIcon';
import RefreshIcon from '../../../components/icons/RefreshIcon';

type GroupListHeaderProps = {
  sorting: boolean;
  setSorting: (sorting: boolean) => void;
  order: number[];
};

const GroupListHeader = ({sorting, setSorting, order}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const groups = useAppSelector(GroupsSelectors.groups);
  const allCollapsed = useAppSelector(GroupsSelectors.itemsAllCollapsed);

  const goToGroupCreate = useCallback(() => navigate(GroupRouteUtils.getCreateUrl()), []);

  const refresh = useCallback((): Promise<void> => dispatch(GroupsActions.fetchGroupsThunk()), []);

  const setAllCollapsed = (value: boolean): void => {
    dispatch(GroupsActions.setAllCollapsed(value));
  };

  const saveOrder = (): void => {
    const orderedGroups = order.map((i) => groups[i]);
    const orderedGroupIds = orderedGroups.map((g) => g.id);
    dispatch(GroupsActions.setGroups(orderedGroups));
    dispatch(GroupsActions.updateOrderThunk(orderedGroupIds));
  };

  const switchCollapsed = (): void => setAllCollapsed(!allCollapsed);

  const enableSorting = (): void => {
    setAllCollapsed(true);
    setTimeout(() => setSorting(true), allCollapsed ? 0 : 400);
  };

  const saveSorting = (): void => {
    saveOrder();
    setSorting(false);
    setTimeout(() => setAllCollapsed(false), 50);
  };

  const cancelSorting = (): void => {
    setSorting(false);
    setTimeout(() => setAllCollapsed(false), 50);
  };

  return (
    <PageHeader sx={{position: 'absolute', zIndex: 100, width: '100%', height: '53px'}}>
      <FHStack>
        <Typography fontSize="16pt" fontWeight="500" color="primary">
          Groups
        </Typography>
      </FHStack>
      {sorting ? (
        <FHStack flexGrow={0}>
          <IconButton color="primary" onClick={saveSorting}>
            <CheckIcon />
          </IconButton>
          <IconButton color="primary" onClick={cancelSorting}>
            <CloseIcon />
          </IconButton>
        </FHStack>
      ) : (
        <FHStack flexGrow={0}>
          <IconButton color="primary" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="primary" onClick={goToGroupCreate}>
            <PlusIcon />
          </IconButton>
          <IconButton color="primary" onClick={switchCollapsed}>
            <CollapsedIcon collapsed={!allCollapsed} />
          </IconButton>
          <IconButton color="primary" onClick={enableSorting}>
            <ReorderIcon />
          </IconButton>
        </FHStack>
      )}
    </PageHeader>
  );
};

export default memo(GroupListHeader);
