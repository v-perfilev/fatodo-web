import React, {FC} from 'react';
import {ItemType} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import {TypeView} from '../../common/views/type-view';
import {LabeledBox} from '../../common/surfaces/labeled-box';

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
