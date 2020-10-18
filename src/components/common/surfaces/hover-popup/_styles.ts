import {makeStyles, Theme} from '@material-ui/core/styles';

export const hoverPopupStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer'
  }
}));

export const hoverPopupPopperStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(1)
  }
}));
