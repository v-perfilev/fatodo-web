import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CARD_FOOTER_HEIGHT, CARD_HEADER_HEIGHT, ITEMS_IN_GROUP_CARD, PAGINATION_BUTTON_WIDTH} from '../_constants';

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
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignItems: 'center',
    '& >  *': {
      marginRight: theme.spacing(1),
    },
  },
  caption: {
    width: '100%',
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
  popupMenu: {
    '& li': {
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(1),
    },
  },
}));

export const groupCardContentStyles = makeStyles((theme: Theme) => ({
  content: {
    height: `calc(100% - ${CARD_HEADER_HEIGHT}px - ${CARD_FOOTER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1.5) + 'px !important',
    paddingBottom: theme.spacing(1) + 'px !important',
  },
  box: {
    height: `calc(100% / ${ITEMS_IN_GROUP_CARD})`,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    flexShrink: 0,
  },
}));

export const groupCardCreateButtonStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

export const groupCardItemStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  leftBox: {
    minHeight: '60%',
    display: 'flex',
    flexGrow: 1,
  },
  leftLeftBox: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  leftRightBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  rightBox: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      color: theme.palette.grey['400'],
      marginLeft: theme.spacing(1),
    },
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    fontSize: '1.5rem',
  },
  typography: {
    width: '100%',
    fontSize: '0.95rem',
  },
}));

export const groupCardItemChangesStyles = makeStyles((theme: Theme) => ({
  name: {
    color: theme.palette.grey['400'],
    fontSize: '0.7rem',
  },
  slash: {
    color: theme.palette.grey['400'],
    fontSize: '0.7rem',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  date: {
    color: theme.palette.grey['400'],
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
}));

export const groupPreviewCardItemButtonsStyles = makeStyles((theme: Theme) => ({
  showIcon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export const groupCardFooterStyles = makeStyles((theme: Theme) => ({
  footer: {
    height: CARD_FOOTER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
  },
  paginationButton: {
    minWidth: PAGINATION_BUTTON_WIDTH,
    width: PAGINATION_BUTTON_WIDTH,
  },
  pageCount: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    '& *': {
      fontWeight: 'bold',
    },
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
