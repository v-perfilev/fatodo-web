import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {useTranslation} from 'react-i18next';
import {ParamDate} from '../../../models/param-date';
import DateView from '../../common/item-layouts/date-view';

type Props = {
  date: ParamDate;
};

const ItemViewDataDate: FC<Props> = ({date}: Props) => {
  const {t} = useTranslation();

  return (
    date && (
      <LabeledBox label={t('items:labels.date')}>
        <DateView date={date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDataDate;
