import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme';
import {ITEMS_IN_GROUP_CARD} from '../_constants';

export const groupCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
}));

export const groupCardHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
    '& .MuiCardHeader-action': {
      marginTop: 2,
      marginRight: -10,
    },
  },
  caption: {
    fontSize: '1rem',
    color: COLORS.WHITE,
  },
  action: {
    color: COLORS.WHITE,
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
    borderColor: COLORS.LIGHT_GREY,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  icon: {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

export const groupCardActionsStyles = makeStyles((theme: Theme) => ({
  actions: {
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
    color: COLORS.GREY,
  },
}));

export const groupCardAvatarsStyles = makeStyles((theme: Theme) => ({
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      width: 35,
      height: 35,
      marginLeft: theme.spacing(-1.5),
      border: 'solid',
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  count: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    color: COLORS.GREY,
  },
}));
