import React, {FC, memo, useEffect, useState} from 'react';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container, ThemeProvider} from '@material-ui/core';
import {itemViewStyles} from './_styles';
import {Item} from '../../../models/item.model';
import PageHeader from '../../common/layout-page/page-header';
import ItemViewData from './item-view-data';
import {generateItem} from '../../_constants';
import PageDivider from '../../common/layout-page/page-divider';
import ItemViewProperties from './item-view-properties';
import ItemViewDescription from './item-view-description';
import {ThemeFactory} from '../../../shared/theme/theme';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemView: FC<Props> = ({setMenu}: Props) => {
  const classes = itemViewStyles();
  const {i18n} = useTranslation();
  const [item, setItem] = useState<Item>(null);

  const loadItem = (): void => {
    // TODO set item
    setItem(generateItem());
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    loadItem();
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  const theme = ThemeFactory.getTheme(item.group.color);

  return (
    item && (
      <ThemeProvider theme={theme}>
        <Container className={classes.root}>
          <PageHeader title={item.title} />
          <PageDivider height={5} />
          <ItemViewData item={item} />
          {item.description && (
            <>
              <PageDivider />
              <ItemViewDescription description={item.description} />
              <PageDivider />
            </>
          )}
          <ItemViewProperties item={item} />
        </Container>
      </ThemeProvider>
    )
  );
};

export default compose(connector, memo)(ItemView);
