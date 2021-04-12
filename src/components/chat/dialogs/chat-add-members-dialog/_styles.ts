import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatAddMembersDialogStyles = makeStyles((theme: Theme) => ({
  memberCount: {
    height: '100%',
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
    fontSize: '1rem',
  },
}));
