import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../common/layouts/header/_constants';

export const messageMainStyles = makeStyles(() => ({
  bigViewRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)'
  },
  sidebar: {
    height: '100%',
    overflowY: 'scroll'
  },
  content: {
    height: '100%',
    overflowY: 'scroll'
  },
  smallViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
}));
