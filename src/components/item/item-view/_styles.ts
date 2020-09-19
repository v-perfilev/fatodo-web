import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../../../shared/theme/theme';

export const itemViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const itemViewDataStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(3),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
}));

export const itemViewDataTypeStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: COLORS.PRIMARY,
      marginRight: theme.spacing(1),
    },
  },
}));

export const itemViewDataPriorityStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: COLORS.PRIMARY,
      marginRight: theme.spacing(1),
    },
  },
}));

export const itemViewPropertiesStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(3),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
}));

export const itemViewPropertiesChangesStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    '& *': {
      color: COLORS.DARK_GREY,
      fontSize: '0.7rem',
    },
    '& > *': {
      marginRight: theme.spacing(3),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
}));

export const itemViewContentStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
