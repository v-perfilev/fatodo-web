import {makeStyles, Theme} from '@material-ui/core/styles';

export const snackStyles = makeStyles((theme: Theme) => ({
  variantSuccess: {
    backgroundColor: theme.palette.success.main + ' !important',
  },
  variantError: {
    backgroundColor: theme.palette.error.main + ' !important',
  },
  variantInfo: {
    backgroundColor: theme.palette.info.main + ' !important',
  },
  variantWarning: {
    backgroundColor: theme.palette.warning.main + ' !important',
  },
}));
