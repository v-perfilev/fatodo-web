import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const messageBoxIncomingStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  message: {
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
    justifyContent: 'space-evenly',
    flexGrow: 1,
    margin: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  date: {
    color: theme.palette.grey['500'],
  },
  body: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
}));

export const messageBoxOutcomingStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '90%',
    float: 'right',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  message: {
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
    justifyContent: 'space-evenly',
    flexGrow: 1,
    margin: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  date: {
    color: theme.palette.grey['500'],
  },
  body: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
}));
