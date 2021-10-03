import {makeStyles, Theme} from '@material-ui/core/styles';

export const contactRelationsContainerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const contactRelationsListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

export const contactRelationsFilterStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(0.5),
  },
}));

export const contactRelationsItemStyles = makeStyles((theme: Theme) => ({
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

export const contactRelationsStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
}));
