import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatControlMessageEventStyles = makeStyles((theme: Theme) => ({
  root: {
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
  },
}));

export const chatControlMessageIncomingStyles = makeStyles((theme: Theme) => ({
  root: {
    whiteSpace: 'nowrap',
  },
  salutation: {
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
  },
}));

export const chatControlMessageOutcomingStyles = makeStyles((theme: Theme) => ({
  root: {
    whiteSpace: 'nowrap',
  },
  salutation: {
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
  },
}));
