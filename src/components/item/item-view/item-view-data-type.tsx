import React, {FC} from 'react';
import LabeledBox from '../../common/layout-page/labeled-box';
import {ItemType} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import TypeView from '../../common/layout-item/type-view';

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
