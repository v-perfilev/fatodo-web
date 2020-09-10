import moment, {Moment} from 'moment';
import {ParamDate} from '../../models/param-date';
import i18n from '../i18n';

export class DateFormats {
  static timeFormat = 'HH:mm';

  static dateFormat = 'DD.MM';

  static dateWithYearFormat = 'DD.MM.YYYY';

  static monthFormat = 'MMMM';
}

export class DateFormatters {
  static formatTime = (date: Date): string => {
    return moment(date).format(DateFormats.timeFormat);
  };

  static formatDate = (date: Date): string => {
    return moment(date).format(DateFormats.dateFormat);
  };

  static formatDateWithYear = (date: Date): string => {
    return moment(date).format(DateFormats.dateWithYearFormat);
  };

  static formatMonth = (date: Date): string => {
    return moment(date).format(DateFormats.monthFormat);
  };
}

export class DateConverters {
  static getParamDateFromTime = (time: Date): ParamDate => {
    return {time: time.getHours() * 60 + time.getMinutes()};
  };

  static getParamDateFromTimeAndDate = (time: Date, date: Date): ParamDate => {
    return {
      time: time.getHours() * 60 + time.getMinutes(),
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  };

  static getParamDateFromTimeAndDateWithoutYear = (time: Date, date: Date): ParamDate => {
    return {
      time: time.getHours() * 60 + time.getMinutes(),
      date: date.getDate(),
      month: date.getMonth(),
    };
  };

  static getTimeFromParamDate = (paramDate: ParamDate): Date => {
    const time = paramDate.time;
    const date = new Date(0);
    date.setHours(Math.floor(time / 60));
    date.setMinutes(time % 60);
    return date;
  };

  static getDateFromParamDate = (paramDate: ParamDate): Date => {
    const date = new Date(0);
    if (paramDate.date) {
      date.setDate(paramDate.date);
    }
    if (paramDate.month) {
      date.setMonth(paramDate.month);
    }
    if (paramDate.year) {
      date.setFullYear(paramDate.year);
    }
    return date;
  };

  static getMomentFromTime = (time: Date) => time ? moment(time) : moment(new Date());

  static getTimeFromMoment = (moment: Moment) => {
    const date = new Date();
    date.setHours(moment.hours());
    date.setMinutes(moment.minutes());
    return date;
  };
}

export class DateUtils {
  static resetLocale = (): void => {
    moment.locale(i18n.language);
  };

  static getDayOfWeek = (date: Date): number => moment(date).weekday();

  static getDatesInMonth = (date: Date): number => moment(date).daysInMonth();

  static getWeekdayNames = (): string[] => moment.weekdaysShort(true);

  static getWeekdayNumbers = (): number[] => {
    const firstDayOfWeek = moment().startOf('week').day();
    return Array.from({length: 7}, (_, i) => (i + firstDayOfWeek) % 7);
  };

  static getDayNamesByNumbers = (numbers: number[]): string[] => {
    const dayNumbers = DateUtils.getWeekdayNumbers();
    const dayNames = DateUtils.getWeekdayNames();
    const firstDayOfWeek = moment().startOf('week').day();
    const daysBeforeFirstDay = [];
    const daysAfterFirstDay = [];
    numbers.filter(n => dayNumbers.includes(n)).forEach(n => {
      if (n < firstDayOfWeek) {
        daysBeforeFirstDay.push(n);
      } else {
        daysAfterFirstDay.push(n);
      }
    });
    const orderedDays = daysAfterFirstDay.concat(daysBeforeFirstDay);
    return orderedDays.map(d => dayNames[dayNumbers.indexOf(d)]);
  };
}
