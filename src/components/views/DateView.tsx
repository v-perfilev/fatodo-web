import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {DateConverters, DateFormatters} from '../../shared/utils/date.utils';
import {DateParams} from '../../models/date-params.model';
import {flowRight} from 'lodash';
import withAuthState from '../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../store/rerducers/auth.reducer';

type DateViewProps = AuthState & {
  date: DateParams;
};

const DateView = ({date: paramDate, account}: DateViewProps) => {
  const {t} = useTranslation();
  const timezone = account.info.timezone;

  let description = '';
  if (paramDate.time) {
    const timeDate = DateConverters.getTimeFromParamDate(paramDate, timezone);
    const time = DateFormatters.formatTime(timeDate);
    description = description.concat(t('common:paramDate.time', {time}));
  }

  if (paramDate.date && paramDate.month) {
    if (paramDate.time) {
      description = description.concat(' ');
    }

    const dateDate = DateConverters.getDateFromParamDate(paramDate, timezone);
    const date = paramDate.year ? DateFormatters.formatDateWithYear(dateDate) : DateFormatters.formatDate(dateDate);

    description = description.concat(t('common:paramDate.date', {date}));
  }

  return <Box>{description}</Box>;
};

export default flowRight([withAuthState])(DateView);
