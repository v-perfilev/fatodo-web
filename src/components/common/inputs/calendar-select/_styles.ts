import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../../../../shared/theme/theme';

export const calendarSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormLabel-root': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0.5),
    },
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
  date: {
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
  dateSmall: {
    width: 34,
    minWidth: 34,
    maxWidth: 34,
    height: 34,
    margin: 1,
  },
  selectedDate: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    '&:hover': {
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.WHITE,
    },
  },
}));
