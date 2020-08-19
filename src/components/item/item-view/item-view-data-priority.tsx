import React, {FC} from 'react';
import PriorityView from '../../common/item-layouts/priority-view';
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
      <PriorityView priority={priority} />
    </LabeledBox>
  );
};

export default ItemViewDataPriority;
