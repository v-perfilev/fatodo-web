import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {DateConverters, DateFormatters} from '../../../shared/utils/date.utils';
import {ParamDate} from '../../../models/param-date.model';

type Props = HTMLAttributes<any> & {
  date: ParamDate;
};

const DateView: FC<Props> = ({date: paramDate, className}: Props) => {
  const {t} = useTranslation();

  let description = '';
  if (paramDate.time) {
    const timeDate = DateConverters.getTimeFromParamDate(paramDate);
    const time = DateFormatters.formatTime(timeDate);
    const translatedTime = t('items:paramDate.time', {time});
    description = description.concat(translatedTime);
  }

  if (paramDate.date && paramDate.month) {
    if (paramDate.time) {
      description = description.concat(' ');
    }

    const dateDate = DateConverters.getDateFromParamDate(paramDate);
    let date;
    if (paramDate.year) {
      date = DateFormatters.formatDateWithYear(dateDate);
    } else {
      date = DateFormatters.formatDate(dateDate);
    }

    const translatedDate = t('items:paramDate.date', {date});
    description = description.concat(translatedDate);
  }

  return <Box className={className}>{description}</Box>;
};

export default DateView;
