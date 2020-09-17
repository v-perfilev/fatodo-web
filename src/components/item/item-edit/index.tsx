import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {Item} from '../../../models/item.model';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {generateItem} from '../../_constants';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form';
import {compose} from 'recompose';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemEdit: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
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

  return item && <ItemForm item={item} header={t('items:headers.editItem', {group: item.group.title})} />;
};

export default compose(connector)(ItemEdit);
