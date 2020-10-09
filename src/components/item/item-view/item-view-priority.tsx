import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PriorityView} from '../../common/views/priority-view';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

const ItemViewPriority: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('items:labels.priority')}>
      <PriorityView priority={item.priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
