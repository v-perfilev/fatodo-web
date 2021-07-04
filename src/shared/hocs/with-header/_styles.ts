import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../../components/layouts/header/_constants';

export const headerStyles = makeStyles(() => ({
  spacer: {
    height: HEADER_HEIGHT,
  },
}));
