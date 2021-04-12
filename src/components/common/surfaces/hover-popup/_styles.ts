import {makeStyles, Theme} from '@material-ui/core/styles';

export const hoverPopupStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
  },
}));

export const hoverPopupPopperStyles = makeStyles((theme: Theme) => ({
  popper: {
    zIndex: 10000,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));
