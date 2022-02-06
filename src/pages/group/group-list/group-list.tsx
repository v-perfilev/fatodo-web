import * as React from 'react';
import {FC, MutableRefObject, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ReorderIcon} from '../../../components/icons/reorder-icon';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {CircularSpinner} from '../../../components/loaders';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {flowRight} from 'lodash';
import withGroupListItems from '../../../shared/hocs/with-list/with-group-list-items';
import {useGroupListItemsContext} from '../../../shared/contexts/list-contexts/group-list-items-context';
import GroupListContainer from './group-list-container';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import ControlMenu from '../../../components/layouts/control-menu/control-menu';
import {PageDivider} from '../../../components/surfaces';
import {Container} from '@material-ui/core';
import withSortableGrid from '../../../shared/hocs/with-sortable-grid/with-sortable-grid';
import {SortProps} from '../../../shared/hocs/with-sortable-grid/types';
import {groupListStyles} from './_styles';
import {CheckIcon} from '../../../components/icons/check-icon';
import {CloseIcon} from '../../../components/icons/close-icon';
import {ArrowUpIcon} from '../../../components/icons/arrow-up-icon';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';

type Props = SortProps;

const GroupList: FC<Props> = (props: Props) => {
  const classes = groupListStyles();
  const {initSizes} = props;
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
  const {groups, setGroups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {loadInitialState, allCollapsed, setAllCollapsed} = useGroupListItemsContext();
  const [sorting, setSorting] = useState<boolean>(false);
  const [order, setOrder] = useState<MutableRefObject<number[]>>();

  const saveOrder = (): void => {
    const orderedGroups = order.current.map((o) => groups[o]);
    const orderedGroupIds = orderedGroups.map((g) => g.id);
    setGroups(orderedGroups);
    ItemService.setGroupOrder(orderedGroupIds)
      .then(() => {
        handleCode('group.sorted', 'info');
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const collapseAll = (): void => setAllCollapsed(true);
  const expandAll = (): void => setAllCollapsed(false);

  const enableSorting = (): void => {
    setAllCollapsed(true);
    setTimeout(
      () => {
        initSizes();
        setSorting(true);
      },
      allCollapsed ? 0 : 500
    );
  };

  const saveSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
    saveOrder();
  };

  const cancelSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
  };

  const menuElements = [
    {icon: <PlusIcon />, action: redirectToGroupCreate, text: t('group:tooltips.create'), hidden: sorting},
    {icon: <ReorderIcon />, action: enableSorting, text: t('group:tooltips.reorder'), hidden: sorting},
    {icon: <CheckIcon />, action: saveSorting, text: t('group:tooltips.saveOrder'), hidden: !sorting},
    {
      icon: <CloseIcon />,
      action: cancelSorting,
      text: t('group:tooltips.resetOrder'),
      color: 'secondary',
      hidden: !sorting,
    },
    {
      icon: <ArrowUpIcon />,
      action: collapseAll,
      text: t('group:tooltips.collapse'),
      color: 'secondary',
      hidden: allCollapsed || sorting,
    },
    {
      icon: <ArrowDownIcon />,
      action: expandAll,
      text: t('group:tooltips.expand'),
      color: 'secondary',
      hidden: !allCollapsed || sorting,
    },
  ] as MenuElement[];

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups.length]);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, allCollapsed, sorting]);

  return groupsLoading ? (
    <CircularSpinner />
  ) : (
    <Container className={classes.container}>
      <ControlMenu menu={menuElements} />
      <PageDivider />
      <GroupListContainer sorting={sorting} setOrder={setOrder} {...props} />
    </Container>
  );
};

export default flowRight([withSortableGrid, withGroupList, withGroupListItems])(GroupList);
