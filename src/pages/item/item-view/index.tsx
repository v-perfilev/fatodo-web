import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useHistory, useParams} from 'react-router-dom';
import {PageDivider, PageHeader, PageSpacer} from '../../../components/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {Routes} from '../../router';
import ItemViewReminders from './item-view-reminders';
import ItemViewTags from './item-view-tags';
import ItemViewChanges from './item-view-changes';
import {EditIcon} from '../../../components/icons/edit-icon';
import {ItemRouteUtils} from '../_router';
import {ItemsIcon} from '../../../components/icons/items-icon';
import {GroupRouteUtils} from '../../group/_router';
import ItemViewInfo from './item-view-info';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import withItemView from '../../../shared/hocs/with-view/with-item-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CircularSpinner} from '../../../components/loaders';
import {GroupsIcon} from '../../../components/icons/groups-icon';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';
import {flowRight} from 'lodash';
import Comments from '../../comment';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';

const ItemView: FC = () => {
  const history = useHistory();
  const {itemId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
  const {handleUserIds} = useUserListContext();
  const {showItemDeleteDialog} = useItemDialogContext();
  const {obj: item, setObj: setItem, setLoad: setLoadItem, loading: itemLoading} = useItemViewContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);

  const redirectToItemEdit = (): void => history.push(ItemRouteUtils.getEditUrl(itemId));
  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(group?.id));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => redirectToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const loadItem = (): void => {
    ItemService.getItem(itemId)
      .then((response) => {
        setItem(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
      });
  };

  const loadGroup = (): void => {
    ItemService.getGroup(item?.groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const menuElements = [
    {icon: <EditIcon />, action: redirectToItemEdit, text: t('item:tooltips.edit')},
    {icon: <DeleteIcon />, action: openItemDeleteDialog, text: t('item:tooltips.delete')},
    {icon: <ItemsIcon />, action: redirectToGroupView, text: t('item:tooltips.list')},
    {icon: <GroupsIcon />, action: redirectToGroups, text: t('item:tooltips.groupList')},
  ] as MenuElement[];

  useEffect(() => {
    setLoadItem(() => (): void => loadItem());
  }, []);

  useEffect(() => {
    if (item) {
      setLoadGroup(() => (): void => loadGroup());
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      loadUsers();
    }
  }, [group]);

  useEffect(() => {
    setMenu(menuElements);
  }, [item, group, i18n.language, showItemDeleteDialog]);

  return itemLoading || groupLoading ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <PageHeader title={item.title} />
        <PageDivider height={5} />
        <ItemViewInfo />
        <PageDivider />
        <ItemViewDescription />
        <ItemViewReminders />
        <ItemViewTags />
        <ItemViewChanges />
        <PageSpacer />
        <Comments targetId={item.id} />
      </Container>
    </ThemeProvider>
  );
};

export default flowRight(withVerticalPadding, withGroupView, withItemView)(ItemView);
