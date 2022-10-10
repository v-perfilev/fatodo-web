import {makeStyles} from '@material-ui/core/styles';

export const wrapperStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
