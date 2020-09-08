import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS} from '../../../../shared/theme';

export const dateInputStyles = makeStyles(() => ({
  box: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
}));

export const dateInputYearsStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '100%',
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  item: {
    margin: theme.spacing(1),
    userSelect: 'none',
    cursor: 'pointer',
    fontSize: '1.3em',
    '&:hover': {
      color: COLORS.PRIMARY,
      fontWeight: 500,
    },
  },
}));
