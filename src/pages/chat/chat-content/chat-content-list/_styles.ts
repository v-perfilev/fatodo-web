import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatContentListContainerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
}));

export const chatContentListRendererStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
}));

export const chatContentListScrollButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    left: '50%',
    right: '50%',
    transform: 'translate(-50%, 0)',
    bottom: theme.spacing(1),
  },
}));
