import {makeStyles, Theme} from '@material-ui/core/styles';

export const staticPageStyles = makeStyles((theme: Theme) => ({
  code: {
    fontSize: '1000%',
    lineHeight: 1,
  },
  buttons: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  loaders: {
    position: 'fixed',
    display: 'inline-block',
    transform: 'translateX(-50%)',
  },
}));
