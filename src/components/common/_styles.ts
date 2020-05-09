import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../shared/theme';

export const smallModalStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: theme.spacing(2),
    color: COLORS.WHITE,
    background: theme.palette.primary.main,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: COLORS.WHITE,
  },
}));
