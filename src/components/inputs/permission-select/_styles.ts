import {makeStyles, Theme} from '@material-ui/core/styles';

export const permissionSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  selector: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey['400'],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  activeSelector: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));
