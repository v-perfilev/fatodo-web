import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const contactIncomingListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export const contactIncomingRequestSkeletonStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
  },
  skeleton1: {
    width: 35,
    height: 35,
    marginRight: theme.spacing(0.5),
  },
  skeleton2: {
    width: 100,
    height: 20,
  },
  skeleton3: {
    width: 90,
    height: 35,
  },
}));

export const contactIncomingRequestStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
  },
  body: {
    display: 'flex',
    flexGrow: 1,
  },
  managementBox: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(3),
    },
  },
}));

export const contactIncomingStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    fontSize: '1.5rem',
    color: theme.palette.grey['400'],
  },
}));
