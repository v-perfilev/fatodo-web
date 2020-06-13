import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const headerStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.02);',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(-1) + 'px !important',
  },
}));

export const horizontalMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
}));

export const sidebarMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 200,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginLeft: theme.spacing(-1) + 'px !important',
  },
}));
