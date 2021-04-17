import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces';
import {PriorityView} from '../../common/views';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';

type Props = HTMLAttributes<HTMLElement>;

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
