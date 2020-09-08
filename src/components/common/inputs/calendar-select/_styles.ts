import {makeStyles} from '@material-ui/core/styles';
import {COLORS} from '../../../../shared/theme';

export const calendarSelectStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  weekHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 500,
    color: COLORS.DARK_GREY,
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    margin: 2,
    padding: 0,
    borderRadius: 40,
  },
  selectedDay: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    '&:hover': {
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.WHITE,
    },
  },
}));
