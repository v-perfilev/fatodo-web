import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatControlItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['200'],
    cursor: 'pointer',

    '&:hover, &.selected': {
      backgroundColor: theme.palette.grey['100'],
    },
  },
  image: {
    marginRight: theme.spacing(1),
  },
  chatContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginLeft: theme.spacing(1),
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
  direct: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey['400'],
  },
  date: {
    color: theme.palette.grey['500'],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
