import {makeStyles, Theme} from '@material-ui/core/styles';

export const checkboxInputStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['500'],
    borderRadius: 5,
  },
}));
