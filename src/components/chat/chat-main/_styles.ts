import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../common/layouts/header/_constants';
import {Theme} from '@material-ui/core';
import {BOTTOM_DRAWER_HEIGHT} from '../../common/layouts/additional-menu/_constants';

export const messageMainStyles = makeStyles((theme: Theme) => ({
  bigViewRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)',
  },
  control: {
    height: '100%',
    overflowY: 'scroll',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey['300'],
  },
  content: {
    height: '100%',
    overflowY: 'scroll',
  },
  smallViewRoot: {
    height: 'calc(100vh - ' + HEADER_HEIGHT + 'px - ' + BOTTOM_DRAWER_HEIGHT + 'px)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
