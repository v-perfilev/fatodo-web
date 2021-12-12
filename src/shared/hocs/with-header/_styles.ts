import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../../components/layouts/header/_constants';

export const headerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: HEADER_HEIGHT,
  },
}));
