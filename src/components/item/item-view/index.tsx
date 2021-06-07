import React, {FC, useEffect} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useHistory, useParams} from 'react-router-dom';
import {PageDivider, PageHeader} from '../../common/surfaces';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {Routes} from '../../router';
import ItemViewReminders from './item-view-reminders';
import ItemViewTags from './item-view-tags';
import ItemViewChanges from './item-view-changes';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {EditIcon} from '../../common/icons/edit-icon';
import {ItemRouteUtils} from '../_router';
import {ItemsIcon} from '../../common/icons/items-icon';
import {GroupRouteUtils} from '../../group/_router';
import ItemViewInfo from './item-view-info';
import {DeleteIcon} from '../../common/icons/delete-icon';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import withItemView from '../../../shared/hocs/with-view/with-item-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CircularSpinner} from '../../common/loaders';
import {GroupsIcon} from '../../common/icons/groups-icon';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';
import {flowRight} from 'lodash';

const ItemView: FC = () => {
  const history = useHistory();
  const {itemId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
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

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<EditIcon />}
        action={redirectToItemEdit}
        color="primary"
        tooltip={t('item:tooltips.edit')}
      />
      <AdditionalMenuButton
        icon={<DeleteIcon />}
        action={openItemDeleteDialog}
        color="primary"
        tooltip={t('item:tooltips.delete')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ItemsIcon />}
        action={redirectToGroupView}
        color="secondary"
        tooltip={t('item:tooltips.list')}
      />
      <AdditionalMenuButton
        icon={<GroupsIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('item:tooltips.groupList')}
      />
    </>
  );

  useEffect(() => {
    setLoadItem(() => (): void => loadItem());
  }, []);

  useEffect(() => {
    if (item) {
      setLoadGroup(() => (): void => loadGroup());
    }
  }, [item]);

  useEffect(() => {
    updateMenu(menu);
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
      </Container>
    </ThemeProvider>
  );
};

export default flowRight(withVerticalPadding, withGroupView, withItemView)(ItemView);
