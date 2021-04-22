import React, {FC, useEffect} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container, ThemeProvider} from '@material-ui/core';
import GroupViewItems from './group-view-items';
import GroupViewUsers from './group-view-users';
import GroupViewMessages from './group-view-messages';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {EditIcon} from '../../common/icons/edit-icon';
import {Routes} from '../../router';
import {GroupRouteUtils} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../common/icons/groups-icon';
import GroupService from '../../../services/group.service';
import {PlusIcon} from '../../common/icons/plus-icon';
import {ItemRouteUtils} from '../../item/_router';
import {ThemeFactory} from '../../../shared/theme/theme';
import {PageDivider, PageHeader, PageSpacer} from '../../common/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {DeleteIcon} from '../../common/icons/delete-icon';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CircularSpinner} from '../../common/loaders';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useGroupDialogContext} from '../../../shared/contexts/dialog-contexts/group-dialog-context';

const GroupView: FC = () => {
  const history = useHistory();
  const {groupId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {handleUserIds} = useUserListContext();
  const {showGroupDeleteDialog} = useGroupDialogContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  const redirectToItemCreate = (): void => history.push(ItemRouteUtils.getCreateUrl(groupId));
  const redirectToGroupEdit = (): void => history.push(GroupRouteUtils.getEditUrl(groupId));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const openGroupDeleteDialog = (): void => {
    const onSuccess = (): void => redirectToGroups();
    showGroupDeleteDialog(group, onSuccess);
  };

  const loadGroup = (): void => {
    GroupService.get(groupId)
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
    const userIds = group.users.map((user) => user.id);
    handleUserIds(userIds);
  };

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={redirectToItemCreate}
        color="primary"
        tooltip={t('item:tooltips.create')}
      />
      <AdditionalMenuButton
        icon={<EditIcon />}
        action={redirectToGroupEdit}
        color="primary"
        tooltip={t('group:tooltips.edit')}
      />
      <AdditionalMenuButton
        icon={<DeleteIcon />}
        action={openGroupDeleteDialog}
        color="primary"
        tooltip={t('group:tooltips.delete')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<GroupsIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('group:tooltips.list')}
      />
    </>
  );

  useEffect(() => {
    setLoadGroup(() => (): void => loadGroup());
  }, []);

  useEffect(() => {
    if (group) {
      loadUsers();
    }
  }, [group]);

  useEffect(() => {
    updateMenu(menu);
  }, [group, i18n.language, showGroupDeleteDialog]);

  return groupLoading ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <PageHeader title={group.title} filename={group.imageFilename} />
        <PageDivider height={5} />
        <GroupViewUsers />
        <GroupViewItems />
        <PageSpacer />
        <GroupViewMessages />
      </Container>
    </ThemeProvider>
  );
};

export default compose(withVerticalPadding, withGroupView)(GroupView);
