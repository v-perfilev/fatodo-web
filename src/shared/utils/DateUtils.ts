import moment from 'moment';
import {tz} from 'moment-timezone';
import initI18n from '../i18n';
import {Moment} from 'moment/moment';

export class DateUtils {
  static resetLocale = (lang?: string): void => {
    const locale = (lang || initI18n.language).toLowerCase();
    moment.locale(locale);
  };

  static getNowTime = (): number => {
    return new Date().getTime();
  };

  static getTimezone = (): string => tz.guess();

  static getWeekdayNames = (): string[] => {
    DateUtils.resetLocale();
    const weekdays = moment.weekdaysShort();
    return [...weekdays.slice(1), weekdays[0]];
  };

  static getWeekdayNumbers = (): number[] => {
    const firstDayOfWeek = moment().startOf('week').day();
    return Array.from({length: 7}, (_, i) => (i + firstDayOfWeek) % 7);
  };

  static getDayNamesByNumbers = (numbers: number[]): string[] => {
    const dayNumbers = DateUtils.getWeekdayNumbers();
    const dayNames = DateUtils.getWeekdayNames();
    const firstDayOfWeek = moment().startOf('week').day();
    const daysBeforeFirstDay: number[] = [];
    const daysAfterFirstDay: number[] = [];
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

  static getDateFromMoment = (moment: Moment): Date => {
    let date = new Date();
    if (moment) {
      date = moment.toDate();
    }
    return date;
  };

  static getTimeFromMoment = (moment: Moment): Date => {
    const date = new Date();
    if (moment) {
      date.setHours(moment.hours());
      date.setMinutes(moment.minutes());
    }
    return date;
  };

  static getDayOfWeek = (date: Date): number => moment(date).weekday();

  static getDatesInMonth = (date: Date): number => moment(date).daysInMonth();

  static isTheSameDay = (date1: Date, date2: Date): boolean => {
    return moment(date1).isSame(date2, 'date');
  };

  static isBefore = (date1: Date, date2: Date): boolean => {
    return moment(date2).isBefore(date1);
  };

  static addMinutes = (date: Date, minutes: number): Date => {
    return moment(date).add(minutes, 'm').toDate();
  };

  static addDays = (date: Date, days: number): Date => {
    return moment(date).add(days, 'd').startOf('day').toDate();
  };
}
