import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const logoStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: 50,
  },
}));

export const logoWithTextStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: 50,
    marginRight: theme.spacing(1),
  },
  logoText: {
    fontWeight: 500,
    fontSize: '2.2rem',
    lineHeight: 1,
    letterSpacing: '0.05em',
  },
}));

export const animatedRouterStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  animated: {
    position: 'absolute',
    width: '100%',
  },
}));