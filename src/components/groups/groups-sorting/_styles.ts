import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS, GRADIENT_COLORS} from '../../../shared/theme';
import {CARD_HEADER_HEIGHT} from '../_constants';

export const groupSortingCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const groupSortingCardHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    height: CARD_HEADER_HEIGHT,
    flexShrink: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: GRADIENT_COLORS.YELLOW,
    '& .MuiCardHeader-action': {
      marginTop: 6,
      marginRight: theme.spacing(0),
      alignSelf: 'center',
      color: COLORS.WHITE,
      cursor: 'pointer',
      '& svg': {
        width: '1.2em',
        height: '1.2em',
      },
    },
  },
  caption: {
    fontSize: '1rem',
    color: COLORS.WHITE,
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
