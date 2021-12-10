import {makeStyles, Theme} from '@material-ui/core/styles';
import {GROUP_ITEM_HEIGHT, PAGINATION_BUTTON_WIDTH} from '../_constants';

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

export const groupViewUsersSkeletonStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  skeleton: {
    width: '100%',
    height: 28,
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

export const groupViewArchivedSwitchStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label: {
    fontWeight: 500,
    color: theme.palette.grey[500],
    marginRight: theme.spacing(0.5),
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

export const groupViewItemSkeletonStyles = makeStyles((theme: Theme) => ({
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
    width: 70,
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
    width: 100,
    height: 20,
  },
}));

export const groupViewItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  card: {
    height: GROUP_ITEM_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    transition: '0.3s',

    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  },
  statusCol: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
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
    fontSize: '1.8rem',
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
  placeholder: {
    height: GROUP_ITEM_HEIGHT,
  },
}));
