import {makeStyles, Theme} from '@material-ui/core/styles';

export const itemViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const itemViewCommonStyles = makeStyles((theme: Theme) => ({
  box: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
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
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const itemViewInfoStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));
