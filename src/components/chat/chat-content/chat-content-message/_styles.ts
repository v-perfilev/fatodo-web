import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatContentMessageActionsStyles = makeStyles((theme: Theme) => ({
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

export const chatContentMessageEventStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
  },
}));

export const chatContentMessageIncomingStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '90%',
    marginRight: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
  },
  message: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['100'],

    '&.unread': {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
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
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export const chatContentMessageOutcomingStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '90%',
    marginLeft: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-end',
  },
  message: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['100'],
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
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
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export const chatContentMessageReactionsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: theme.spacing(0.5),
    color: theme.palette.grey['500'],
  },
  pointer: {
    cursor: 'pointer',
  },
  count: {
    marginRight: theme.spacing(0.5),
  },
  reaction: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5),
  },
}));
