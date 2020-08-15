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
  green: {
    // TODO add gradient colors
    background: GRADIENT_COLORS.YELLOW,
  },
}));

export const pageHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
}));

export const paperBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
