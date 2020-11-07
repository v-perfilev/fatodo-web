import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PriorityView} from '../../common/views/priority-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewPriority: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  return (
    <LabeledBox label={t('item:labels.priority')} className={className}>
      <PriorityView priority={item.priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
