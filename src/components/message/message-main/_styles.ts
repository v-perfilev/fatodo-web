import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../common/layouts/header/_constants';
import {Theme} from '@material-ui/core';

export const messageMainStyles = makeStyles((theme: Theme) => ({
  bigViewRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)'
  },
  sidebar: {
    height: '100%',
    overflowY: 'scroll',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey['300']
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
