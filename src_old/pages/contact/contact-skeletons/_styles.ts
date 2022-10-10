import {makeStyles, Theme} from '@material-ui/core/styles';

export const contactSkeletonsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

export const contactSkeletonsItemStyles = makeStyles((theme: Theme) => ({
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
    width: 150,
    height: 20,
  },
  skeleton3: {
    width: 90,
    height: 35,
    marginLeft: theme.spacing(1),
  },
}));
