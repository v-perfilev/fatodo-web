import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTROL_HEADER_HEIGHT} from '../_constants';

export const messageControlStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  }
}));

export const messageControlHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTROL_HEADER_HEIGHT,
    minHeight: CHAT_CONTROL_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  }
}));

export const messageControlListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTROL_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));

export const messageControlFilteredListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTROL_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));

export const messageControlChatButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    flexShrink: 0
  }
}));

export const messageControlChatStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 65,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['200'],
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.grey['100']
    }
  },
  image: {
    marginRight: theme.spacing(1)
  },
  chatContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-evenly'
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    fontWeight: 'bold'
  },
  date: {
    color: theme.palette.grey['500'],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
