import {makeStyles} from '@material-ui/core/styles';

export const soloBadgeStyles = makeStyles(() => ({
  root: {
    '& .MuiBadge-badge': {
      position: 'relative !important',
      transform: 'none !important',
    },
  },
}));
