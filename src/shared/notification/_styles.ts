import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const notificationProviderStyles = makeStyles((theme: Theme) => ({
  variantSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  variantError: {
    backgroundColor: theme.palette.error.main,
  },
  variantInfo: {
    backgroundColor: theme.palette.info.main,
  },
  variantWarning: {
    backgroundColor: theme.palette.warning.main,
  },
}));
