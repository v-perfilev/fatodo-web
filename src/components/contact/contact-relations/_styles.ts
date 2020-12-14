import {makeStyles, Theme} from '@material-ui/core/styles';

export const contactRelationsContainerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
}));

export const contactRelationsListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  }
}));

export const contactRelationsFilterStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  input: {
    width: 400
  }
}));

export const contactRelationsItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2)
  },
  body: {
    display: 'flex',
    flexGrow: 1
  },
  managementBox: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(3)
    }
  }
}));
