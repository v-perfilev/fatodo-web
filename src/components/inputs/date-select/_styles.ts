import {makeStyles, Theme} from '@material-ui/core/styles';

export const dateInputStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
  },
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
    backgroundColor: theme.palette.background.paper,
  },
}));

export const dateInputItemStyles = makeStyles((theme: Theme) => ({
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
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
}));
