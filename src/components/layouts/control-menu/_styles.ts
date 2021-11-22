import {makeStyles, Theme} from '@material-ui/core/styles';

export const controlMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  floatRight: {
    justifyContent: 'right',
  },
}));
