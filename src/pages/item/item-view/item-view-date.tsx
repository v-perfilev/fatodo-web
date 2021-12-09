import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../../components/surfaces';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import DateView from '../../../components/views/date-view';

type Props = HTMLAttributes<HTMLElement>;

const ItemViewDate: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')} className={className}>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
