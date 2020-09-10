import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, memo, useEffect, useState} from 'react';
import {Item} from '../../../models/item';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form/item-form';
import {compose} from 'recompose';
import {TEST_GROUP} from '../../_constants';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemCreate: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
  const [item, setItem] = useState<Item>(null);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    setItem({group: TEST_GROUP} as Item);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return item && <ItemForm item={item} headerPrefix={t('items:headers.createItem')} />;
};

export default compose(connector, memo)(ItemCreate);