import React, {FC} from 'react';
import PriorityView from '../../common/item-layouts/priority-view';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {ItemPriority} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import PaperBox from '../../common/page-layouts/paper-box';

type Props = {
  priority: ItemPriority;
};

const ItemViewDataPriority: FC<Props> = ({priority}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.priority')}>
      <PaperBox>
        <PriorityView priority={priority} />
      </PaperBox>
    </LabeledBox>
  );
};

export default ItemViewDataPriority;
