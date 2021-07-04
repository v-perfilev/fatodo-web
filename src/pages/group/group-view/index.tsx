import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import GroupViewItems from './group-view-items';
import GroupViewUsers from './group-view-users';
import GroupViewMessages from './group-view-messages';
import {EditIcon} from '../../../components/icons/edit-icon';
import {Routes} from '../../router';
import {GroupRouteUtils} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../../components/icons/groups-icon';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {ItemRouteUtils} from '../../item/_router';
import {ThemeFactory} from '../../../shared/theme/theme';
import {PageDivider, PageHeader, PageSpacer} from '../../../components/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context/additional-menu-context';
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

const GroupView: FC = () => {
  const history = useHistory();
  const {groupId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
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
    const userIds = group.users.map((user) => user.id);
    handleUserIds(userIds);
  };

  const additionalMenuItems = [
    {icon: <PlusIcon />, action: redirectToItemCreate, tooltip: t('item:tooltips.create')},
    {icon: <EditIcon />, action: redirectToGroupEdit, tooltip: t('group:tooltips.edit')},
    {icon: <DeleteIcon />, action: openGroupDeleteDialog, tooltip: t('group:tooltips.delete')},
    {icon: <GroupsIcon />, action: redirectToGroups, tooltip: t('group:tooltips.list')},
  ];

  useEffect(() => {
    setLoadGroup(() => (): void => loadGroup());
  }, []);

  useEffect(() => {
    if (group) {
      loadUsers();
    }
  }, [group]);

  useEffect(() => {
    setMenu(additionalMenuItems);
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

export default flowRight([withVerticalPadding, withGroupView])(GroupView);
