import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {DateView} from '../../common/views/date-view';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

const ItemViewDate: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('items:labels.date')}>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
