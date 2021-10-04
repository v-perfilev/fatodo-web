import {makeStyles} from '@material-ui/core/styles';

export const contactMainStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const contactFilterStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: 400,
  },
}));
