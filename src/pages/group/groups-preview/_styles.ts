import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CARD_CHANGES_HEIGHT, CARD_HEADER_HEIGHT, ITEMS_HEIGHT_IN_GROUP_CARD} from '../_constants';

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
    display: 'flex',
    flexDirection: 'column',
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

export const groupCardCreateButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    height: ITEMS_HEIGHT_IN_GROUP_CARD,
    boxSizing: 'border-box',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export const groupCardItemStyles = makeStyles((theme: Theme) => ({
  item: {
    height: ITEMS_HEIGHT_IN_GROUP_CARD,
    boxSizing: 'border-box',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    flexShrink: 0,
  },
  card: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.palette.grey['300'],
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  headerBox: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: CARD_CHANGES_HEIGHT / 4,
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  changesBox: {
    height: CARD_CHANGES_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: '1.5rem',
  },
  typography: {
    width: '100%',
  },
}));

export const groupCardItemChangesStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.grey['500'],
    fontSize: '0.7rem',
  },
}));

export const groupCardNotificationsStyles = makeStyles((theme: Theme) => ({
  users: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
  badges: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(1),
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
