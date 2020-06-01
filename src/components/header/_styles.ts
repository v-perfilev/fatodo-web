import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const headerStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.02);',
  },
  toolbar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
}));

export const accountStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      '&:first-child': {
        marginLeft: theme.spacing(0),
      },
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
}));
