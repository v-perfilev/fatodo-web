import React, {FC} from 'react';
import LabeledBox from '../../common/layouts/labeled-box';
import {ItemType} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import TypeView from '../../common/views/type-view';

type Props = {
  type: ItemType;
};

const ItemViewType: FC<Props> = ({type}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.type')}>
      <TypeView type={type} />
    </LabeledBox>
  );
};

export default ItemViewType;
