import { makeStyles, Theme } from '@material-ui/core/styles';

export const itemViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  box: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const itemViewChangesStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& *': {
      color: theme.palette.grey['500'],
      fontSize: '0.7rem',
    },
    '& > *': {
      marginRight: theme.spacing(3),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      marginRight: theme.spacing(3),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  }
}));

export const itemViewInfoStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(4),
    },
  },
}));
