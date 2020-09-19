import {makeStyles, Theme} from '@material-ui/core/styles';

export const timeInputStyles = makeStyles((theme: Theme) => ({
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
