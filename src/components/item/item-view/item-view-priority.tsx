import React, {FC} from 'react';
import PriorityView from '../../common/layout-item/priority-view';
import LabeledBox from '../../common/layouts/labeled-box';
import {ItemPriority} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';

type Props = {
  priority: ItemPriority;
};

const ItemViewPriority: FC<Props> = ({priority}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.priority')}>
      <PriorityView priority={priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
