import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const popupMenuItemStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  firstElement: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(-0.5),
    marginRight: theme.spacing(1),
  },
}));
