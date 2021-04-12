import {makeStyles, Theme} from '@material-ui/core/styles';

export const avatarGroupStyles = makeStyles((theme: Theme) => ({
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& > *': {
      marginLeft: theme.spacing(-1.5),
      '&:first-child': {
        marginLeft: 0
      }
    }
  },
  count: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.grey['400']
  },
  pointer: {
    cursor: 'pointer'
  }
}));
