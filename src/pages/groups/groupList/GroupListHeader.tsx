import React, {memo, useCallback} from 'react';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions} from '../../../store/groups/groupsActions';
import PageHeader from '../../../components/layouts/PageHeader';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useTranslation} from 'react-i18next';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenu';
import {IconButton} from '@mui/material';
import BellIcon from '../../../components/icons/BellIcon';

type GroupListHeaderProps = {
  width?: number;
  sorting: boolean;
  setSorting: (sorting: boolean) => void;
  order: number[];
  toggleCollapsed?: () => void;
};

const GroupListHeader = ({width, sorting, setSorting, order, toggleCollapsed}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const allCollapsed = useAppSelector(GroupsSelectors.itemsAllCollapsed);
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goToGroupCreate = useCallback(() => navigate(GroupRouteUtils.getCreateUrl()), []);

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

  const sortingMenuItems: PageMenuItem[] = [
    {
      action: saveSorting,
      text: t('group:actions.save'),
      icon: <CheckIcon />,
      color: 'primary',
    },
    {
      action: cancelSorting,
      text: t('group:actions.cancel'),
      icon: <CloseIcon />,
      color: 'primary',
    },
  ];

  const regularMenuItems: PageMenuItem[] = [
    {
      action: goToGroupCreate,
      text: t('group:actions.createGroup'),
      icon: <PlusIcon />,
      color: 'primary',
    },
    {
      action: switchCollapsed,
      text: t('group:actions.collapse'),
      icon: <CollapsedIcon collapsed={!allCollapsed} />,
      color: 'primary',
    },
    {
      action: enableSorting,
      text: t('group:actions.reorder'),
      icon: <ReorderIcon />,
      color: 'primary',
    },
  ];

  return (
    <PageHeader width={width} maxWidth="md" position="absolute" title={t('routes.Groups')}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <BellIcon />
        </IconButton>
      )}
      <PageMenu items={sorting ? sortingMenuItems : regularMenuItems} />
    </PageHeader>
  );
};

export default memo(GroupListHeader);
