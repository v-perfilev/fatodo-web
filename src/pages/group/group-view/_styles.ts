import {makeStyles, Theme} from '@material-ui/core/styles';
import {PAGINATION_BUTTON_WIDTH} from '../_constants';

export const groupViewUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0.5),
    },
  },
}));

export const groupViewItemsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export const groupViewArchivedSwitchStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

export const groupViewItemsPaginationStyles = makeStyles((theme: Theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
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
}));

export const groupViewItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
  },
  statusCol: {
    display: 'flex',
    alignItems: 'center',
  },
  iconCol: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 2,
  },
  titleCol: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  buttonCol: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      color: theme.palette.grey['400'],
      marginLeft: theme.spacing(1),
    },
  },
  icon: {
    fontSize: '1.8rem',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 50,
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  contentBox: {
    display: 'flex',
    flexGrow: 1,
    fontSize: '1rem',
  },
}));

export const groupViewItemButtonsStyles = makeStyles((theme: Theme) => ({
  showIcon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  archivedIcon: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  editIcon: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  deleteIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}));

export const groupViewItemChangesStyles = makeStyles((theme: Theme) => ({
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

export const groupViewCreateButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));
