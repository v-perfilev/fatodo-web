import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CARD_HEADER_HEIGHT, ITEMS_IN_GROUP_CARD} from '../_constants';

export const groupCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const groupCardHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CARD_HEADER_HEIGHT,
    flexShrink: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: theme.palette.gradient,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& >  *': {
      marginRight: theme.spacing(1),
    },
  },
  caption: {
    fontSize: '1rem',
    color: theme.palette.primary.contrastText,
  },
}));

export const groupCardActionsStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: -2,
    marginRight: -4,
    color: theme.palette.primary.contrastText,
  },
}));

export const groupCardBodyStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const groupCardContentStyles = makeStyles((theme: Theme) => ({
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  box: {
    flexGrow: 1,
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  pageCount: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& *': {
      fontWeight: 'bold',
    },
  },
}));

export const groupCardItemStyles = makeStyles((theme: Theme) => ({
  item: {
    height: 'calc(100% / ' + ITEMS_IN_GROUP_CARD + ')',
    boxSizing: 'border-box',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.palette.grey['300'],
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  icon: {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  typography: {
    width: '100%',
  },
}));

export const groupCardNotificationsStyles = makeStyles((theme: Theme) => ({
  deleteUser: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
  badges: {
    marginRight: theme.spacing(1),
    '& > *': {
      marginLeft: theme.spacing(2),
    },
  },
  icon: {
    color: theme.palette.grey['400'],
  },
}));

export const groupCardAvatarsStyles = makeStyles((theme: Theme) => ({
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      marginLeft: theme.spacing(-1.5),
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  count: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    color: theme.palette.grey['400'],
  },
}));

export const groupGridContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

export const groupGridItemStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: theme.spacing(1),
  },
}));
