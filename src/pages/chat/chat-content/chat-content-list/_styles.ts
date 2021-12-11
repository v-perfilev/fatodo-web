import {makeStyles} from '@material-ui/core/styles';
import {CHAT_CONTENT_FOOTER_HEIGHT, CHAT_CONTENT_HEADER_HEIGHT} from '../../_constants';
import {Theme} from '@material-ui/core';

export const chatContentListContainerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: `calc(100% - ${CHAT_CONTENT_HEADER_HEIGHT}px - ${CHAT_CONTENT_FOOTER_HEIGHT}px)`,
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
