import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme/theme';
import {HEADER_HEIGHT} from './_constants';

export const headerStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: COLORS.WHITE,
  },
  toolbar: {
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
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
