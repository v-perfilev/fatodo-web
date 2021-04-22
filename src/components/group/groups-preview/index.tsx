import * as React from 'react';
import {FC, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ReorderIcon} from '../../common/icons/reorder-icon';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../common/icons/plus-icon';
import GroupService from '../../../services/group.service';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {compose} from 'recompose';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {CircularSpinner} from '../../common/loaders';
import GroupPreviewGridContainer from './group-preview-grid-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

const GroupPreview: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {handleUserIds} = useUserListContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {objs: groups, setObjs: setGroups, setLoad: setLoadGroups, loading: groupsLoading} = useGroupListContext();

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const redirectToGroupsSorting = (): void => history.push(GroupRouteUtils.getSortingUrl());

  const loadGroups = (): void => {
    GroupService.getAll()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    const userIds = groups
      .map((group) => group.users.map((user) => user.id))
      .reduce((acc, userIds) => [...acc, ...userIds], []);
    handleUserIds(userIds);
  };

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={redirectToGroupCreate}
        color="primary"
        tooltip={t('group:tooltips.create')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ReorderIcon />}
        action={redirectToGroupsSorting}
        color="secondary"
        tooltip={t('group:tooltips.reorder')}
      />
    </>
  );

  useEffect(() => {
    setLoadGroups(() => (): void => loadGroups());
  }, []);

  useEffect(() => {
    if (groups) {
      loadUsers();
    }
  }, [groups]);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return groupsLoading ? <CircularSpinner /> : <GroupPreviewGridContainer />;
};

export default compose(withGroupList)(GroupPreview);
