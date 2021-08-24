import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  image: {
    marginRight: theme.spacing(1),
  },
  name: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  date: {
    color: theme.palette.grey['500'],
    marginRight: theme.spacing(0.5),
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  deleted: {
    color: theme.palette.grey['500'],
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
}));

export const commentItemReactionsStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 50,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: theme.spacing(0.5),
    color: theme.palette.grey['500'],
  },
  pointer: {
    cursor: 'pointer',
  },
  reaction: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5),
  },
  countOnLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countOnRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  count: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export const commentItemActionsStyles = makeStyles((theme: Theme) => ({
  popupMenu: {
    '& .MuiListItem-root': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiSvgIcon-root': {
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5),
    },
  },
}));

export const commentItemReferenceStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
