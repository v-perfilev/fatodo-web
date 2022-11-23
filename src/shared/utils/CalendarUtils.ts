import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarMonth} from '../../models/Calendar';

export class CalendarUtils {
  /*
  Index getters
   */

  static getMonthIndexByItem = (value: CalendarMonth): number => {
    const dateMoment = moment({year: value.year, month: value.month, date: 1});
    return dateMoment.diff(CalendarConstants.firstDate, 'month');
  };

  /*
   CalendarDate getters
   */

  public static getCurrentDate = (): CalendarDate => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const date = now.date();
    return CalendarUtils.enrichDate({year, month, date});
  };

  public static getDateByMonthIndex = (monthIndex: number): CalendarDate => {
    const dateMoment = CalendarConstants.firstDate.clone().add(monthIndex, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const date = dateMoment.date();
    return CalendarUtils.enrichDate({year, month, date});
  };

  /*
   CalendarMonth getters
   */

  public static getMonthByMonthIndex = (monthIndex: number): CalendarMonth => {
    const dateMoment = CalendarConstants.firstDate.clone().add(monthIndex, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    return {year, month};
  };

  /*
  GENERATORS
   */

  public static generateMonthDates = (index: number): CalendarDate[] => {
    const dateMoment = CalendarConstants.firstDate.clone().add(index, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const monthMoment = moment({year, month, d: 10});

    const prevMonthMoment = monthMoment.clone().subtract(1, 'month');
    const nextMonthMoment = monthMoment.clone().add(1, 'month');

    const prevYear = prevMonthMoment.year();
    const prevMonth = prevMonthMoment.month();

    const nextYear = nextMonthMoment.year();
    const nextMonth = nextMonthMoment.month();

    const firstDateMoment = monthMoment.clone().startOf('month');
    const firstDateDay = firstDateMoment.day() === 0 ? 7 : firstDateMoment.day();
    const lastDateMoment = monthMoment.clone().endOf('month');
    const lastDateDay = lastDateMoment.day() === 0 ? 7 : lastDateMoment.day();
    const daysInMonth = monthMoment.daysInMonth();
    const daysPreviousInMonth = prevMonthMoment.daysInMonth();

    const calendarDates: CalendarDate[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date = daysPreviousInMonth - firstDateDay + i + 1;
      const enrichedDate = CalendarUtils.enrichDate({year: prevYear, month: prevMonth, date});
      calendarDates.push(enrichedDate);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = i;
      const enrichedDate = CalendarUtils.enrichDate({year, month, date});
      calendarDates.push(enrichedDate);
    }

    for (let i = lastDateDay + 1; i <= 7; i++) {
      const date = i - lastDateDay;
      const enrichedDate = CalendarUtils.enrichDate({year: nextYear, month: nextMonth, date});
      calendarDates.push(enrichedDate);
    }

    return calendarDates;
  };

  /*
  REMINDERS
   */

  public static extractRemindersGroupIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.parentId);
  };

  public static extractRemindersItemIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.targetId);
  };

  public static extractDatesToLoad = (keys: string[]): [number, number, number, number] => {
    const yearFrom = Number(keys[0].slice(0, 4));
    const monthFrom = Number(keys[0].slice(5));
    const yearTo = Number(keys[keys.length - 1].slice(0, 4));
    const monthTo = Number(keys[keys.length - 1].slice(5));
    return [yearFrom, monthFrom, yearTo, monthTo];
  };

  /*
  UTILS
   */

  public static enrichDate = (value: CalendarDate): CalendarDate => {
    const monthIndex = CalendarUtils.getMonthIndexByItem(value);
    return {...value, monthIndex};
  };

  public static buildMonthKeyByItem = (value: CalendarMonth): string => {
    const year = value.year;
    const month = value.month;
    return year + '_' + month;
  };

  public static buildMonthKeyByIndex = (monthIndex: number): string => {
    const date = CalendarUtils.getDateByMonthIndex(monthIndex);
    const year = date.year;
    const month = date.month;
    return year + '_' + month;
  };

  public static getMonthDate = (value: CalendarMonth): Date => {
    const year = value.year;
    const month = value.month;
    return moment({year, month, d: 10}).toDate();
  };
}

export class CalendarConstants {
  public static readonly firstDate = moment({year: 1900, month: 0, date: 1});

  public static readonly lastDate = moment({year: 2100, month: 11, date: 31});

  public static maxMonthIndex = CalendarUtils.getMonthIndexByItem({
    year: CalendarConstants.lastDate.year(),
    month: CalendarConstants.lastDate.month(),
  });
}
