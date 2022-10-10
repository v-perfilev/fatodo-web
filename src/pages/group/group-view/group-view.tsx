import React, {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import GroupViewItems from './group-view-items/group-view-items';
import GroupViewUsers from './group-view-users';
import {EditIcon} from '../../../components/icons/EditIcon';
import {Routes} from '../../router';
import {GroupRouteUtils} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../../components/icons/GroupsIcon';
import {PlusIcon} from '../../../components/icons/PlusIcon';
import {ItemRouteUtils} from '../../item/_router';
import {ThemeFactory} from '../../../shared/theme/theme';
import {PageDivider, PageSpacer} from '../../../components/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {DeleteIcon} from '../../../components/icons/DeleteIcon';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CircularSpinner} from '../../../components/loaders';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useGroupDialogContext} from '../../../shared/contexts/dialog-contexts/group-dialog-context';
import {flowRight} from 'lodash';
import Comments from '../../comment/comment';
import {MembersIcon} from '../../../components/icons/MembersIcon';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {UserPlusIcon} from '../../../components/icons/UserPlusIcon';
import {LeaveIcon} from '../../../components/icons/LeaveIcon';
import {GroupUtils} from '../../../shared/utils/group.utils';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import GroupViewHeader from './group-view-header';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import withArchivedItemList from '../../../shared/hocs/with-list/with-archived-item-list';

type Props = AuthState;

const GroupView: FC<Props> = ({account}: Props) => {
  const history = useHistory();
  const {groupId} = useParams();
  const {t, i18n} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {users, handleUserIds} = useUserListContext();
  const {
    showGroupDeleteDialog,
    showGroupMembersDialog,
    showGroupAddMembersDialog,
    showGroupLeaveDialog,
  } = useGroupDialogContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  const redirectToItemCreate = (): void => history.push(ItemRouteUtils.getCreateUrl(groupId));
  const redirectToGroupEdit = (): void => history.push(GroupRouteUtils.getEditUrl(groupId));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadGroupUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const openGroupMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup(groupId, redirectToNotFound, redirectToGroups);
    showGroupMembersDialog(group, users, onSuccess);
  };

  const openGroupAddMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup(groupId, redirectToNotFound, redirectToGroups);
    showGroupAddMembersDialog(group, onSuccess);
  };

  const openGroupDeleteDialog = (): void => {
    const onSuccess = (): void => redirectToGroups();
    showGroupDeleteDialog(group, onSuccess);
  };

  const openGroupLeaveDialog = (): void => {
    const onSuccess = (): void => redirectToGroups();
    showGroupLeaveDialog(group, onSuccess);
  };

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canEdit = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const menuElements = [
    {icon: <GroupsIcon />, action: redirectToGroups, text: t('group:tooltips.list'), hiddenInControlMenu: true},
    {icon: <PlusIcon />, action: redirectToItemCreate, text: t('item:tooltips.create'), hidden: !canEdit},
    {icon: <EditIcon />, action: redirectToGroupEdit, text: t('group:tooltips.edit'), hidden: !canAdmin},
    {icon: <MembersIcon />, action: openGroupMembersDialog, text: t('group:tooltips.members')},
    {
      icon: <UserPlusIcon />,
      action: openGroupAddMembersDialog,
      text: t('group:tooltips.addMembers'),
      hidden: !canAdmin,
    },
    {
      icon: <LeaveIcon />,
      action: openGroupLeaveDialog,
      text: t('group:tooltips.leave'),
      color: 'secondary',
      disabled: !canLeave,
    },
    {
      icon: <DeleteIcon />,
      action: openGroupDeleteDialog,
      text: t('group:tooltips.delete'),
      color: 'secondary',
      hidden: !canAdmin,
    },
  ] as MenuElement[];

  useEffect(() => {
    loadGroup(groupId, redirectToNotFound, redirectToGroups);
  }, []);

  useEffect(() => {
    if (group) {
      loadGroupUsers();
    }
  }, [group]);

  useEffect(() => {
    setMenu(menuElements);
  }, [group, i18n.language, showGroupDeleteDialog]);

  return !group ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <GroupViewHeader group={group} showArchived={showArchived} setShowArchived={setShowArchived} />
        <PageDivider height={5} />
        <ControlMenu menu={menuElements} />
        <PageDivider />
        <GroupViewUsers />
        <PageDivider />
        <GroupViewItems showArchived={showArchived} account={account} />
        <PageSpacer />
        <Comments targetId={group.id} />
      </Container>
    </ThemeProvider>
  );
};

export default flowRight([
  withVerticalPadding,
  withGroupView,
  withItemList,
  withArchivedItemList,
  withUserList,
  withAuthState,
])(memo(GroupView));
