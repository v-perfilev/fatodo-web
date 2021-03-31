import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const soloBadgeStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiBadge-badge': {
      position: 'relative !important',
      transform: 'none !important'
    }
  }
}));
