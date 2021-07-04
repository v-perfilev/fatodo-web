import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTROL_HEADER_HEIGHT} from '../../_constants';

export const chatControlHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTROL_HEADER_HEIGHT,
    minHeight: CHAT_CONTROL_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300'],
  },
  button: {
    marginLeft: theme.spacing(1),
    flexShrink: 0,
  },
}));
