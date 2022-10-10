import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

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
    width: '95%',
    marginRight: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    marginRight: theme.spacing(1),
  },
  message: {
    minWidth: 'max(150px, 30%)',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['50'],

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
    color: theme.palette.grey['400'],
    fontWeight: 'bold',
    fontSize: '0.7rem',
    marginRight: theme.spacing(0.5),
  },
  body: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  deleted: {
    color: theme.palette.grey['500'],
  },
}));

export const chatContentMessageOutcomingStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  message: {
    minWidth: 'max(150px, 30%)',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['50'],
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
    color: theme.palette.grey['400'],
    fontWeight: 'bold',
    fontSize: '0.7rem',
    marginRight: theme.spacing(0.5),
  },
  body: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  deleted: {
    color: theme.palette.grey['500'],
  },
}));

export const chatContentMessageReactionsStyles = makeStyles((theme: Theme) => ({
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
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(0.25),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0.5),
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
