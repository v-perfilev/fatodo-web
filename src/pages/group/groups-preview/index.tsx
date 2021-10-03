import * as React from 'react';
import {FC, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ReorderIcon} from '../../../components/icons/reorder-icon';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {CircularSpinner} from '../../../components/loaders';
import GroupPreviewGridContainer from './group-preview-grid-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ItemService from '../../../services/item.service';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';

const GroupPreview: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {handleUserIds} = useUserListContext();
  const {setMenu} = useAdditionalMenuContext();
  const {objs: groups, setObjs: setGroups, setLoad: setLoadGroups, loading: groupsLoading} = useGroupListContext();

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const redirectToGroupsSorting = (): void => history.push(GroupRouteUtils.getSortingUrl());

  const loadGroups = (): void => {
    ItemService.getAllGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    const userIds = groups
      .map((group) => group.members.map((user) => user.id))
      .reduce((acc, userIds) => [...acc, ...userIds], []);
    handleUserIds(userIds);
  };

  const menuElements = [
    {icon: <PlusIcon />, action: redirectToGroupCreate, text: t('group:tooltips.create')},
    {icon: <ReorderIcon />, action: redirectToGroupsSorting, text: t('group:tooltips.reorder')},
  ] as MenuElement[];

  useEffect(() => {
    setLoadGroups(() => (): void => loadGroups());
  }, []);

  useEffect(() => {
    if (groups) {
      loadUsers();
    }
  }, [groups]);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language]);

  return groupsLoading ? <CircularSpinner /> : <GroupPreviewGridContainer />;
};

export default withGroupList(GroupPreview);
