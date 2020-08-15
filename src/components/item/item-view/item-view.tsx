import React, {FC, memo, useEffect, useState} from 'react';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import {itemStyles} from './_styles';
import {Item} from '../../../models/item';
import {TEST_GROUP} from '../../groups/_constants';
import PageHeader from '../../common/page-layouts/page-header';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemView: FC<Props> = ({setMenu}: Props) => {
  const classes = itemStyles();
  const {i18n} = useTranslation();
  const [item, setItem] = useState<Item>(null);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    // TODO set item
    setItem(TEST_GROUP.items[0]);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return item && (
    <Container className={classes.root}>
      <PageHeader title={item.title} color={'yellow'} />
      Test
    </Container>
  );
};

export default compose(connector, memo)(ItemView);
