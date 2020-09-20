import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CARD_HEADER_HEIGHT} from '../_constants';

export const groupSortingCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const groupSortingCardHeaderStyles = makeStyles((theme: Theme) => ({
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


export const groupSortingCardActionsStyles = makeStyles((theme: Theme) => ({
  action: {
    marginTop: 10,
    marginRight: 6,
    alignSelf: 'center',
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    '& svg': {
      width: '1.1em',
      height: '1.1em',
    },
  },
}));

export const groupSortingGridContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 'calc(100% - ' + theme.spacing(2) + 'px)',
    position: 'relative',
    margin: theme.spacing(1),
  },
}));

export const groupSortingGridItemStyles = makeStyles((theme: Theme) => ({
  item: {
    position: 'absolute',
    width: '100%',
    padding: theme.spacing(1),
    userSelect: 'none',
  },
}));
