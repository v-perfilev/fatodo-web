import {makeStyles} from '@material-ui/core/styles';

export const additionalMenuStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  rootMenuBottom: {
    flexDirection: 'column-reverse',
  },
  rootMenuLeft: {
    flexDirection: 'row',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
}));
