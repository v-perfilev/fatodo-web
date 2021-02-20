import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_FILTER_HEADER_HEIGHT} from '../_constants';

export const messageChatFilterStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_FILTER_HEADER_HEIGHT,
    minHeight: CHAT_FILTER_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  },
  input: {
    width: '100%',
  }
}));
