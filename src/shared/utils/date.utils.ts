import moment, {Moment} from 'moment';
import {DateParams} from '../../models/date-params.model';
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

  static formatDependsOfDay = (date: Date): string => {
    const isToday = moment(date).isSame(moment(new Date()), 'day');
    return isToday ? moment(date).format(DateFormats.timeFormat) : moment(date).format(DateFormats.dateWithYearFormat);
  };
}

export class DateConverters {
  static getParamDateFromTime = (time: Date): DateParams => {
    if (!time) {
      return null;
    }
    return {time: time.getHours() * 60 + time.getMinutes()};
  };

  static getParamDateFromTimeAndDate = (time: Date, date: Date): DateParams => {
    if (!time && !date) {
      return null;
    }
    let result = {};
    if (time) {
      result = {
        ...result,
        time: time.getHours() * 60 + time.getMinutes()
      };
    }
    if (date) {
      result = {
        ...result,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      };
    }
    return result;
  };

  static getParamDateFromTimeAndDateWithoutYear = (time: Date, date: Date): DateParams => {
    if (!time && !date) {
      return null;
    }
    let result = {};
    if (time) {
      result = {
        ...result,
        time: time.getHours() * 60 + time.getMinutes()
      };
    }
    if (date) {
      result = {
        ...result,
        date: date.getDate(),
        month: date.getMonth()
      };
    }
    return result;
  };

  static getTimeFromParamDate = (paramDate: DateParams): Date => {
    if (!paramDate || !paramDate.time) {
      return null;
    }
    const time = paramDate.time;
    const date = new Date(0);
    date.setHours(Math.floor(time / 60));
    date.setMinutes(time % 60);
    return date;
  };

  static getDateFromParamDate = (paramDate: DateParams): Date => {
    if (paramDate == null || (!paramDate.date && !paramDate.month && !paramDate.year)) {
      return null;
    }
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

  static getMomentFromTime = (time: Date): Moment => (time ? moment(time) : moment(new Date()));

  static getTimeFromMoment = (moment: Moment): Date => {
    const date = new Date();
    if (moment) {
      date.setHours(moment.hours());
      date.setMinutes(moment.minutes());
    }
    return date;
  };

  static getDateFromMoment = (moment: Moment): Date => {
    let date = new Date();
    if (moment) {
      date = moment.toDate();
    }
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
    numbers
      .filter((n) => dayNumbers.includes(n))
      .forEach((n) => {
        if (n < firstDayOfWeek) {
          daysBeforeFirstDay.push(n);
        } else {
          daysAfterFirstDay.push(n);
        }
      });
    const orderedDays = daysAfterFirstDay.concat(daysBeforeFirstDay);
    return orderedDays.map((d) => dayNames[dayNumbers.indexOf(d)]);
  };
}
