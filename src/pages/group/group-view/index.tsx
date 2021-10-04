import React, {FC, memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import GroupViewItems from './group-view-items';
import GroupViewUsers from './group-view-users';
import {EditIcon} from '../../../components/icons/edit-icon';
import {Routes} from '../../router';
import {GroupRouteUtils} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../../components/icons/groups-icon';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {ItemRouteUtils} from '../../item/_router';
import {ThemeFactory} from '../../../shared/theme/theme';
import {PageDivider, PageHeader, PageSpacer} from '../../../components/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CircularSpinner} from '../../../components/loaders';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useGroupDialogContext} from '../../../shared/contexts/dialog-contexts/group-dialog-context';
import ItemService from '../../../services/item.service';
import {flowRight} from 'lodash';
import Comments from '../../comment';
import {MembersIcon} from '../../../components/icons/members-icon';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import ControlMenu from '../../../components/layouts/control-menu';
import {UserPlusIcon} from '../../../components/icons/user-plus-icon';
import {LeaveIcon} from '../../../components/icons/leave-icon';
import {GroupUtils} from '../../../shared/utils/group.utils';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';

type Props = AuthState;

const GroupView: FC<Props> = ({account}: Props) => {
  const history = useHistory();
  const {groupId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
  const {users, handleUserIds} = useUserListContext();
  const {
    showGroupDeleteDialog,
    showGroupMembersDialog,
    showGroupAddMembersDialog,
    showGroupLeaveDialog,
  } = useGroupDialogContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  const redirectToItemCreate = (): void => history.push(ItemRouteUtils.getCreateUrl(groupId));
  const redirectToGroupEdit = (): void => history.push(GroupRouteUtils.getEditUrl(groupId));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadGroup = (): void => {
    ItemService.getGroup(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
        redirectToGroups();
      });
  };

  const loadUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const openGroupMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup();
    showGroupMembersDialog(group, users, onSuccess);
  };

  const openGroupAddMembersDialog = (): void => {
    const onSuccess = (): void => loadGroup();
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
    {icon: <GroupsIcon />, action: redirectToGroups, text: t('group:tooltips.list')},
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
    setLoadGroup(() => (): void => loadGroup());
  }, []);

  useEffect(() => {
    if (group) {
      loadUsers();
    }
  }, [group]);

  useEffect(() => {
    setMenu(menuElements);
  }, [group, i18n.language, showGroupDeleteDialog]);

  return groupLoading ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <PageHeader title={group.title} filename={group.imageFilename} />
        <PageDivider height={5} />
        <GroupViewUsers />
        <PageSpacer />
        <GroupViewItems />
        <PageSpacer />
        <ControlMenu menu={menuElements} />
        <PageSpacer />
        <Comments targetId={group.id} />
      </Container>
    </ThemeProvider>
  );
};

export default flowRight([withVerticalPadding, withGroupView, withAuthState, memo])(GroupView);
