import React, {FC, memo, useEffect, useState} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Container, ThemeProvider} from '@material-ui/core';
import {itemViewStyles} from './_styles';
import {Item} from '../../../models/item.model';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useHistory, useParams} from 'react-router-dom';
import {Group} from '../../../models/group.model';
import {PageDivider} from '../../common/surfaces/page-divider';
import {PageHeader} from '../../common/surfaces/page-header';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import GroupService from '../../../services/group.service';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {Routes} from '../../router';
import ItemViewReminders from './item-view-reminders';
import ItemViewTags from './item-view-tags';
import ItemViewChanges from './item-view-changes';
import {compose} from 'recompose';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {EditIcon} from '../../common/icons/edit-icon';
import {ItemRouteUtils} from '../_router';
import {ItemsIcon} from '../../common/icons/items-icon';
import {GroupRouteUtils} from '../../groups/_router';
import ItemViewInfo from './item-view-info';
import {DeleteIcon} from '../../common/icons/delete-icon';

const ItemView: FC = () => {
  const classes = itemViewStyles();
  const history = useHistory();
  const {itemId} = useParams();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const [item, setItem] = useState<Item>();
  const [group, setGroup] = useState<Group>();

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  const redirectToEditItem = (): void => history.push(ItemRouteUtils.getEditUrl(itemId));
  const redirectToViewGroup = (): void => history.push(GroupRouteUtils.getViewUrl(group?.id));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<EditIcon />}
        action={redirectToEditItem}
        color="primary"
        tooltip={t('items:tooltips.edit')}
      />
      <AdditionalMenuButton
        icon={<DeleteIcon />}
        action={console.log}
        color="primary"
        tooltip={t('items:tooltips.delete')}
      />
      <AdditionalMenuButton
        icon={<ItemsIcon />}
        action={redirectToViewGroup}
        color="secondary"
        tooltip={t('items:tooltips.list')}
      />
    </>
  );

  const loadItem = (): void => {
    ItemService.get(itemId)
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
    GroupService.get(item?.groupId)
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

  useEffect(() => {
    loadItem();
  }, []);

  useEffect(() => {
    if (item) {
      loadGroup();
    }
  }, [item]);

  useEffect(() => {
    updateMenu(menu);
  }, [group, i18n.language]);

  return (
    item &&
    group && (
      <ThemeProvider theme={theme}>
        <Container className={classes.root}>
          <PageHeader title={item.title} />
          <PageDivider height={5} />
          <ItemViewInfo item={item} group={group} className={classes.box} />
          <PageDivider />
          <ItemViewDescription description={item.description} className={classes.box} />
          <ItemViewReminders reminders={item.reminders} className={classes.box} />
          <ItemViewTags tags={item.tags} className={classes.box} />
          <ItemViewChanges item={item} className={classes.box} />
        </Container>
      </ThemeProvider>
    )
  );
};

export default compose(memo)(ItemView);
