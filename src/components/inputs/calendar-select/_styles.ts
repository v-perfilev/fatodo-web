import {makeStyles, Theme} from '@material-ui/core/styles';

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
    color: theme.palette.grey['500'],
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));
