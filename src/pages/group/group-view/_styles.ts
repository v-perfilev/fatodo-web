import {makeStyles, Theme} from '@material-ui/core/styles';
import {GROUP_ITEM_HEIGHT} from '../_constants';

export const groupViewUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0.5),
    },
  },
}));

export const groupViewArchivedSwitchStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label: {
    fontWeight: 500,
    color: theme.palette.grey[500],
    marginRight: theme.spacing(0.5),
  },
}));

export const groupViewCreateButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  placeholder: {
    height: GROUP_ITEM_HEIGHT,
  },
}));
