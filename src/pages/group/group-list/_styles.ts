import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const groupListStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export const groupListContainerStyles = makeStyles(() => ({
  sortingBox: {
    position: 'relative',
  },
}));

export const groupListItemStyles = makeStyles(() => ({
  sortingBox: {
    position: 'absolute',
    width: '100%',
  },
}));
