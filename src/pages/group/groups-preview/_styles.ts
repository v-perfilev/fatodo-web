import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {
  CARD_FOOTER_HEIGHT,
  CARD_HEADER_HEIGHT,
  CARD_HEIGHT,
  CARD_ITEM_HEIGHT,
  GROUP_ITEM_HEIGHT,
  PAGINATION_BUTTON_WIDTH,
} from '../_constants';

export const groupsPreviewCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: CARD_HEIGHT,
  },
}));

export const groupsPreviewCardHeaderStyles = makeStyles((theme: Theme) => ({
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

export const groupsPreviewCardActionsStyles = makeStyles((theme: Theme) => ({
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

export const groupsPreviewCardContentStyles = makeStyles((theme: Theme) => ({
  content: {
    height: `calc(100% - ${CARD_HEADER_HEIGHT}px - ${CARD_FOOTER_HEIGHT}px)`,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1.5) + 'px !important',
    paddingBottom: theme.spacing(1) + 'px !important',
  },
}));

export const groupsPreviewCardCreateButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  placeholder: {
    height: CARD_ITEM_HEIGHT,
  },
}));

export const groupsPreviewItemSkeletonsItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  card: {
    height: GROUP_ITEM_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
  },
  middleBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  skeleton1: {
    width: 60,
    height: 40,
  },
  skeleton2: {
    width: '100%',
    height: 15,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  skeleton3: {
    width: '30%',
    height: 10,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  skeleton4: {
    width: 30,
    height: 20,
  },
}));

export const groupsPreviewCardItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  card: {
    height: CARD_ITEM_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    transition: '0.3s',

    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  },
  statusCol: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  iconsCol: {
    height: '72%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: theme.spacing(1),
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  buttonsCol: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      color: theme.palette.grey['400'],
      marginLeft: theme.spacing(1),
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

export const groupsPreviewCardItemChangesStyles = makeStyles((theme: Theme) => ({
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

export const groupsPreviewCardItemButtonsStyles = makeStyles((theme: Theme) => ({
  showIcon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export const groupsPreviewCardFooterStyles = makeStyles((theme: Theme) => ({
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

export const groupsPreviewGridContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

export const groupsPreviewGridItemStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: theme.spacing(1),
  },
  card: {
    height: CARD_HEIGHT,
  },
}));

export const groupsPreviewGridCreateButtonStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: theme.spacing(1),
  },
  card: {
    height: CARD_HEIGHT,
  },
}));
