import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_HEADER_HEIGHT} from '../../_constants';

export const chatContentHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTENT_HEADER_HEIGHT,
    minHeight: CHAT_CONTENT_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    fontWeight: 'bold'
  },
  direct: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey['400']
  }
}));

export const chatContentHeaderActionsStyles = makeStyles((theme: Theme) => ({
  popupMenu: {
    '& .MuiListItem-root': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiSvgIcon-root': {
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5)
    }
  }
}));
