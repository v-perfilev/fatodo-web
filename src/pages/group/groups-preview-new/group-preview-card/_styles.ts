import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CARD_HEADER_HEIGHT, CARD_ITEM_HEIGHT} from '../../_constants';

export const groupsPreviewCardStyles = makeStyles((theme: Theme) => ({
  box: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  accordion: {
    overflow: 'hidden',
  },
}));

export const groupsPreviewCardHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CARD_HEADER_HEIGHT,
    minHeight: CARD_HEADER_HEIGHT + 'px !important',
    flexShrink: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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

export const groupsPreviewCardAvatarsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const groupsPreviewCardCreateButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    borderWidth: 1,
    borderColor: theme.palette.primary.contrastText,
  },
}));

export const groupsPreviewCardActionsStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
}));

export const groupsPreviewCardExpandButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    transition: 'transform 400ms ease-out',
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
}));

export const groupsPreviewCardContentStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.5) + 'px !important',
    paddingTop: theme.spacing(1) + 'px !important',
    paddingBottom: theme.spacing(1) + 'px !important',
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
