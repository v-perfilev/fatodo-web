import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useHistory, useParams} from 'react-router-dom';
import {PageDivider, PageSpacer} from '../../../components/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
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
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';
import {flowRight} from 'lodash';
import Comments from '../../comment/comment';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import ControlMenu from '../../../components/layouts/control-menu/control-menu';
import {GroupUtils} from '../../../shared/utils/group.utils';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {useReminderListContext} from '../../../shared/contexts/list-contexts/reminder-list-context';
import withReminderList from '../../../shared/hocs/with-list/with-reminder-list';
import ItemViewHeader from './item-view-header';

type Props = AuthState;

const ItemView: FC<Props> = ({account}: Props) => {
  const history = useHistory();
  const {itemId} = useParams();
  const {t, i18n} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {handleUserIds} = useUserListContext();
  const {showItemDeleteDialog} = useItemDialogContext();
  const {item, load: loadItem} = useItemViewContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const {load: loadReminders} = useReminderListContext();

  const theme = ThemeFactory.getTheme(group?.color);

  const redirectToItemEdit = (): void => history.push(ItemRouteUtils.getEditUrl(itemId));
  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(group?.id));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => redirectToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const loadUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const canEdit = group && GroupUtils.canEdit(account, group);

  const menuElements = [
    {icon: <ItemsIcon />, action: redirectToGroupView, text: t('item:tooltips.list'), hiddenInControlMenu: true},
    {icon: <EditIcon />, action: redirectToItemEdit, text: t('item:tooltips.edit'), hidden: !canEdit},
    {
      icon: <DeleteIcon />,
      action: openItemDeleteDialog,
      text: t('item:tooltips.delete'),
      color: 'secondary',
      hidden: !canEdit,
    },
  ] as MenuElement[];

  useEffect(() => {
    loadItem(itemId, redirectToNotFound);
    loadReminders(itemId);
  }, []);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId, redirectToNotFound);
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

  return !item || !group ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <ItemViewHeader title={item.title} group={group} />
        <PageDivider height={5} />
        <ItemViewInfo />
        <PageDivider />
        <ItemViewDescription />
        <PageDivider />
        <ItemViewReminders />
        <ItemViewTags />
        <ItemViewChanges />
        <PageSpacer />
        <ControlMenu menu={menuElements} />
        <PageSpacer />
        <Comments targetId={item.id} />
      </Container>
    </ThemeProvider>
  );
};

export default flowRight(withVerticalPadding, withGroupView, withItemView, withReminderList, withAuthState)(ItemView);
