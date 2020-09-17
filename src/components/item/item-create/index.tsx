import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {Item} from '../../../models/item.model';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form';
import {compose} from 'recompose';
import {TEST_GROUP} from '../../_constants';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemCreate: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
  const [item, setItem] = useState<Item>(null);

  const loadItem = (): void => {
    setItem({group: TEST_GROUP} as Item);
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

  return item && <ItemForm item={item} header={t('items:headers.createItem', {group: item.group.title})} />;
};

export default compose(connector)(ItemCreate);
