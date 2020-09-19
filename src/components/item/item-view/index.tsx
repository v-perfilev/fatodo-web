import React, {FC, memo, useEffect, useState} from 'react';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import {itemViewStyles} from './_styles';
import {Item} from '../../../models/item.model';
import PageHeader from '../../common/layout-page/page-header';
import ItemViewData from './item-view-data';
import {generateItem} from '../../_constants';
import PageDivider from '../../common/layout-page/page-divider';
import ItemViewProperties from './item-view-properties';
import ItemViewDescription from './item-view-description';

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

  return (
    item && (
      <Container className={classes.root}>
        <PageHeader title={item.title} color={item.group.color} />
        <PageDivider color={item.group.color} height={5} />
        <ItemViewData item={item} />
        {item.description && (
          <>
            <PageDivider color={item.group.color} />
            <ItemViewDescription description={item.description} />
            <PageDivider color={item.group.color} />
          </>
        )}
        <ItemViewProperties item={item} />
      </Container>
    )
  );
};

export default compose(connector, memo)(ItemView);
