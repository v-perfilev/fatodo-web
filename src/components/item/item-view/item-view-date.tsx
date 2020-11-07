import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {DateView} from '../../common/views/date-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewDate: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')} className={className}>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
