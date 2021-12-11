import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const contactOutcomingListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export const contactOutcomingRequestStyles = makeStyles((theme: Theme) => ({
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

export const contactOutcomingStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    fontSize: '1.5rem',
    color: theme.palette.grey['400'],
  },
}));
