import {makeStyles, Theme} from '@material-ui/core/styles';

export const contactListStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const contactListContainerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const contactListFilterStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
