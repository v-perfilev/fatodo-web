import React, {FC} from 'react';
import Priority from '../../common/item-layouts/priority';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {ItemPriority} from '../../../models/item';
import {useTranslation} from 'react-i18next';

type Props = {
  priority: ItemPriority;
};

const ItemViewDataPriority: FC<Props> = ({priority}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.priority')}>
      <Priority priority={priority} />
    </LabeledBox>
  );
};

export default ItemViewDataPriority;
