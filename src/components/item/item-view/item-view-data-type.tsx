import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {ItemType} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import TypeView from '../../common/item-layouts/type-view';

type Props = {
  type: ItemType;
};

const ItemViewDataType: FC<Props> = ({type}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.type')}>
      <TypeView type={type} />
    </LabeledBox>
  );
};

export default ItemViewDataType;
