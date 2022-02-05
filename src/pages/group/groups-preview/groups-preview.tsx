import * as React from 'react';
import {FC, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ReorderIcon} from '../../../components/icons/reorder-icon';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {CircularSpinner} from '../../../components/loaders';
import GroupsPreviewGridContainer from './groups-preview-grid-container';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {flowRight} from 'lodash';
import withGroupListItems from '../../../shared/hocs/with-list/with-group-list-items';
import {useGroupListItemsContext} from '../../../shared/contexts/list-contexts/group-list-items-context';

const GroupsPreview: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {loadInitialState} = useGroupListItemsContext();

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const redirectToGroupsSorting = (): void => history.push(GroupRouteUtils.getSortingUrl());

  const menuElements = [
    {icon: <PlusIcon />, action: redirectToGroupCreate, text: t('group:tooltips.create')},
    {icon: <ReorderIcon />, action: redirectToGroupsSorting, text: t('group:tooltips.reorder')},
  ] as MenuElement[];

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups]);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language]);

  return groupsLoading ? <CircularSpinner /> : <GroupsPreviewGridContainer />;
};

export default flowRight([withGroupList, withGroupListItems])(GroupsPreview);
