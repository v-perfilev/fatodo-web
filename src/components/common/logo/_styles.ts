import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const logoStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 50,
    }
  },
}));

export const logoWithTextStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 50,
    }
  },
  logoText: {
    fontWeight: 500,
    fontSize: '2.2rem',
    lineHeight: 1,
    letterSpacing: '0.05em',
  },
}));
