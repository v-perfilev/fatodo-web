import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {TimeUtils} from '../../../shared/utils/time.utils';
import {ParamDate} from '../../../models/param-date';

type Props = HTMLAttributes<any> & {
  date: ParamDate;
}

const DateView: FC<Props> = ({date: paramDate, className}: Props) => {
  const {t} = useTranslation();

  let description = '';
  if (paramDate.time) {
    const timeDate = TimeUtils.getTimeFromParamDate(paramDate);
    const time = TimeUtils.formatTime(timeDate);
    const translatedTime = t('items:paramDate.time', {time});
    description = description.concat(translatedTime);
  }

  if (paramDate.day && paramDate.month) {
    if (paramDate.time) {
      description = description.concat(' ');
    }

    const dateDate = TimeUtils.getDateFromParamDate(paramDate);
    let date = '';
    if (paramDate.year) {
      date = TimeUtils.formatDateWithYear(dateDate);
    } else {
      date = TimeUtils.formatDate(dateDate);
    }

    const translatedDate = t('items:paramDate.date', {date});
    description = description.concat(translatedDate);
  }

  return <Box className={className}>{description}</Box>;
};

export default DateView;
