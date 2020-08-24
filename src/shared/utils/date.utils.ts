import moment from 'moment';
import {ParamDate} from '../../models/param-date';

export class DateUtils {

  static getTimeFromParamDate = (paramDate: ParamDate): Date => {
    const time = paramDate.time;
    const date = new Date(0);
    date.setHours(Math.floor(time / 60));
    date.setMinutes(time % 60);
    return date;
  };

  static getDateFromParamDate = (paramDate: ParamDate): Date => {
    const date = new Date(0);
    if (paramDate.day) {
      date.setDate(paramDate.day);
    }
    if (paramDate.month) {
      date.setMonth(paramDate.month);
    }
    if (paramDate.year) {
      date.setFullYear(paramDate.year);
    }
    return date;
  };

  static formatTime = (date: Date): string => {
    return moment(date).format('hh:mm');
  };

  static formatDate = (date: Date): string => {
    return moment(date).format('DD.MM');
  };

  static formatDateWithYear = (date: Date): string => {
    return moment(date).format('DD.MM.YYYY');
  };

  static getTimeFormat = (): string => 'HH:mm';

  static getDateFormat = (): string => 'DD.MM';

  static getDateWithYearFormat = (): string => 'DD.MM.YYYY';

}
