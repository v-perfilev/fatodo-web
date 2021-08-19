import {makeStyles} from '@material-ui/core/styles';

export const commentsContainerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    // height: 'calc(100vh - ' + CHAT_CONTENT_HEADER_HEIGHT + 'px - ' + CHAT_CONTENT_FOOTER_HEIGHT + 'px)',
  },
}));

export const commentsRendererStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
}));
