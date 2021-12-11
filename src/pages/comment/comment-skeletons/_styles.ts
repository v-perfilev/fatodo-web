import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentSkeletonStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  col1: {
    display: 'flex',
    alignItems: 'flex-start',
    marginRight: theme.spacing(1),
  },
  col2: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  row1: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
  },
  row2: {
    display: 'flex',
    flexDirection: 'column',
    // height: 30,
  },
  skeleton1: {
    width: 40,
    height: 40,
  },
  skeleton2: {
    width: 150,
    height: 20,
  },
  skeleton3: {
    width: 100,
    height: 25,
  },
  skeleton4: {
    width: '100%',
    height: 20,
    marginTop: theme.spacing(1),
  },
  skeleton5: {
    width: '70%',
    height: 20,
  },
}));
