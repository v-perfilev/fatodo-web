import {makeStyles} from '@material-ui/core/styles';

export const chatContentStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  },
  placeholder: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));
