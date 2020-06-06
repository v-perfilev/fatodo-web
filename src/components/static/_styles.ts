import {makeStyles, Theme} from '@material-ui/core/styles';

export const staticPageStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  code: {
    fontSize: '10em',
    lineHeight: 1,
  },
  buttons: {
    display: 'flex',
    '& > *': {
      flexGrow: 1,
      flexBasis: 1,
      '&:first-child': {
        marginRight: theme.spacing(1),
      },
      '&:last-child': {
        marginLeft: theme.spacing(1),
      },
    },
  },
  loaders: {
    position: 'fixed',
    '& > *:first-child': {
      position: 'relative',
    },
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  },
}));
