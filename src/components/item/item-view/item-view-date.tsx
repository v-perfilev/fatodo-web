import React, {FC} from 'react';
import LabeledBox from '../../common/layouts/labeled-box';
import {useTranslation} from 'react-i18next';
import {ParamDate} from '../../../models/param-date.model';
import DateView from '../../common/views/date-view';

type Props = {
  date: ParamDate;
};

const ItemViewDate: FC<Props> = ({date}: Props) => {
  const {t} = useTranslation();

  return date && (
    <LabeledBox label={t('items:labels.date')}>
      <DateView date={date} />
    </LabeledBox>
  );
};

export default ItemViewDate;