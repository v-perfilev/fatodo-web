import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../../components/surfaces';
import {DateView} from '../../../components/views';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';

type Props = HTMLAttributes<HTMLElement>;

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
