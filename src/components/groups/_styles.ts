import {makeStyles} from '@material-ui/core/styles';

export const groupsStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const groupsMenuStyles = makeStyles(() => ({
  drawer: {
    width: 100,
  },
}));
