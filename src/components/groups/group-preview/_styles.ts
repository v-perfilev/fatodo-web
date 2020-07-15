import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme';
import {CARD_HEADER_HEIGHT} from '../_constants';

export const groupPreviewCardStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const groupPreviewCardHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    height: CARD_HEADER_HEIGHT,
    flexShrink: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    '& .MuiCardHeader-action': {
      marginTop: 0,
      marginRight: theme.spacing(-1.5),
      alignSelf: 'center',
    },
  },
  caption: {
    fontSize: '1rem',
    color: COLORS.WHITE,
  },
}));
