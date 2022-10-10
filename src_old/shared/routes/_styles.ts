import {makeStyles} from '@material-ui/core/styles';

export const animatedRouterStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  animated: {
    position: 'absolute',
    width: '100%',
  },
}));
