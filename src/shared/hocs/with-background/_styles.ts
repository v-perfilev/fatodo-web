import {makeStyles} from '@material-ui/core/styles';

export const backgroundStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      maxWidth: '80%',
    },
  },
  footer: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    position: 'relative',
  },
  imgBox: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    minWidth: '100%',
    minHeight: '100%',
  },
}));
