import {makeStyles} from '@material-ui/core/styles';
import {COLORS} from '../../../../shared/theme/theme';

export const timeInputStyles = makeStyles(() => ({
  textField: {
    width: '100%',
  },
  box: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
}));
