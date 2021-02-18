import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const messageControlStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  }
}));
