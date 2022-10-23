import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
  imageAndReactions: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    marginRight: theme.spacing(1.5),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  date: {
    color: theme.palette.grey['400'],
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  placeholder: {
    flexGrow: 1,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  deleted: {
    color: theme.palette.grey['500'],
  },
}));

export const commentItemReactionsStyles = makeStyles((theme: Theme) => ({
  root: {
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
    marginRight: theme.spacing(1),
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

export const commentItemReferenceStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
    marginRight: theme.spacing(0.5),
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));