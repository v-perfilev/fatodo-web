import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../../components/layouts/header/_constants';
import {Theme} from '@material-ui/core';

export const chatMainStyles = makeStyles((theme: Theme) => ({
  bigViewRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  control: {
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey['300'],
  },
  content: {},
  smallViewRoot: {
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
