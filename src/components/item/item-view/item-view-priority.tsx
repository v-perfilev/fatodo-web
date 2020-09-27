import React, {FC} from 'react';
import {ItemPriority} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/layouts/labeled-box';
import {PriorityView} from '../../common/views/priority-view';

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
