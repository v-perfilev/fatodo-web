import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../../../../shared/theme/theme';

export const daysSelectStyles = makeStyles((theme: Theme) => ({
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
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    minWidth: 34,
    maxWidth: 34,
    height: 34,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2,
    padding: 0,
    borderRadius: 20,
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
