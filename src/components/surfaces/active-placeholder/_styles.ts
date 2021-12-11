import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const activePlaceholderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s',

    '& .icon': {
      width: 56,
      height: 56,
      borderRadius: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      background: theme.palette.grey['300'],
      transition: '0.3s',

      '& svg': {
        fontSize: '2rem',
      },
    },

    '& .text': {
      fontSize: '1.3rem',
      color: theme.palette.grey['400'],
      transition: '0.3s',
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[50],

      '& .icon': {
        background: theme.palette.grey['400'],
      },

      '& .text': {
        color: theme.palette.grey['500'],
      },
    },
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  small: {
    '& .icon': {
      width: 40,
      height: 40,

      '& svg': {
        fontSize: '1.3rem',
      },
    },

    '& .text': {
      fontSize: '1rem',
    },
  },
}));
