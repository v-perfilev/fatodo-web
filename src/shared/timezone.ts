import timezone from 'moment-timezone';
import {DateUtils} from './utils/date.utils';

const deprecatedTimeZones = [
  'UCT',
  'PST8PDT',
  'GB',
  'MST7MDT',
  'EST5EDT',
  'W-SU',
  'CST6CDT',
  'HST',
  'MST',
  'Universal',
  'EET',
  'WET',
  'EST',
  'CET',
  'MET',
  'GMT',
  'Etc',
];
const deprecatedTimeZonesRegex = `^${deprecatedTimeZones.join('|^')}`;

export const TIMEZONE_MAP = timezone.tz
  .names()
  .filter((timezone) => timezone.startsWith('A') || !new RegExp(deprecatedTimeZonesRegex).test(timezone))
  .sort((timezoneA, timezoneB) => timezoneA.localeCompare(timezoneB))
  .reduce((map, tz) => map.set(tz, DateUtils.formatTimezone(tz)), new Map());
