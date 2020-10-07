import React, {FC, HTMLAttributes} from 'react';
import {ItemPriority} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PriorityView} from '../../common/views/priority-view';

type Props = HTMLAttributes<any> & {
  priority: ItemPriority;
};

const ItemViewPriority: FC<Props> = ({priority, className}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.priority')} className={className}>
      <PriorityView priority={priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
