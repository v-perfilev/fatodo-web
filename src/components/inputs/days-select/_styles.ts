import {makeStyles, Theme} from '@material-ui/core/styles';

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
    color: theme.palette.grey['500'],
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));
