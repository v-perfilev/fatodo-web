import React, {FC, memo, useEffect, useState} from 'react';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import {itemViewStyles} from './_styles';
import {Item} from '../../../models/item';
import PageHeader from '../../common/page-layouts/page-header';
import ItemViewFeatures from './item-view-features';
import ItemViewContent from './item-view-content';
import {generateItem} from '../../_constants';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemView: FC<Props> = ({setMenu}: Props) => {
  const classes = itemViewStyles();
  const {i18n} = useTranslation();
  const [item, setItem] = useState<Item>(null);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    // TODO set item
    setItem(generateItem());
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return item && (
    <Container className={classes.root}>
      <PageHeader title={item.title} subtitle={item.group.title} color={item.group.color} />
      <ItemViewFeatures />
      <ItemViewContent />
    </Container>
  );
};

export default compose(connector, memo)(ItemView);
