import React, {FC, memo, useEffect, useState} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container, ThemeProvider} from '@material-ui/core';
import {itemViewStyles} from './_styles';
import {Item} from '../../../models/item.model';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';
import {Group} from '../../../models/group.model';
import ItemViewGroup from './item-view-group';
import ItemViewType from './item-view-type';
import ItemViewDate from './item-view-date';
import ItemViewPriority from './item-view-priority';
import ItemViewReminders from './item-view-reminders';
import ItemViewTags from './item-view-tags';
import ItemViewChanges from './item-view-changes';
import {PageDivider} from '../../common/layouts/page-divider';
import {PageHeader} from '../../common/layouts/page-header';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';

const ItemView: FC = () => {
  const classes = itemViewStyles();
  const {i18n} = useTranslation();
  const history = useHistory();
  const {updateMenu} = useAdditionalMenuContext();
  const [item, setItem] = useState<Item>();
  const [group, setGroup] = useState<Group>();

  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  const loadItemAndGroup = (): void => {
    // TODO set item and group
    redirectToNotFound();
  };

  useEffect(() => {
    loadItemAndGroup();
    updateMenu(menu, true);
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return (
    item &&
    group && (
      <ThemeProvider theme={theme}>
        <Container className={classes.root}>
          <PageHeader title={item.title} />
          <PageDivider height={5} />
          <ItemViewGroup group={group} />
          <ItemViewType type={item.type} />
          <ItemViewDate date={item.date} />
          <ItemViewPriority priority={item.priority} />
          <ItemViewDescription description={item.description} />
          <ItemViewReminders reminders={item.reminders} />
          <ItemViewTags tags={item.tags} />
          <ItemViewChanges item={item} />
        </Container>
      </ThemeProvider>
    )
  );
};

export default compose(memo)(ItemView);
