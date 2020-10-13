import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {DateView} from '../../common/views/date-view';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewDate: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('items:labels.date')} className={className}>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
