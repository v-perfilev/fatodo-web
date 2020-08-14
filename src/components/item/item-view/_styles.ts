import {makeStyles, Theme} from '@material-ui/core/styles';
import {COLORS, GRADIENT_COLORS} from '../../../shared/theme';

export const itemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

