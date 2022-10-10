import {makeStyles, Theme} from '@material-ui/core/styles';
import {GROUP_ITEM_HEIGHT} from '../../_constants';

export const groupViewSkeletonUsersStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  skeleton: {
    width: '30%',
    height: 28,
  },
}));

export const groupViewSkeletonItemStyles = makeStyles((theme: Theme) => ({
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
