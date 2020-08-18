import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {GRADIENT_COLORS} from '../../../shared/theme';

export const pageDividerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 1,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  yellow: {
    background: GRADIENT_COLORS.YELLOW,
  },
}));

export const pageHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));

export const labeledBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(2),
    },
    '& > *:first-child': {
      marginRight: theme.spacing(1.5),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
  label: {
    fontWeight: 500,
  }
}));

export const paperBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export const pageSpacerStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(2),
  },
}));
