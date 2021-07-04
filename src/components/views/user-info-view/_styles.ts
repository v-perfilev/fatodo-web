import {makeStyles, Theme} from '@material-ui/core/styles';

export const userInfoViewStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 300,
    minHeight: 180,
  },
  imageItem: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(1.5),
  },
  infoItem: {
    paddingLeft: theme.spacing(0.5),
  },
  buttonsItem: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(0.5),
      height: 35,
    },
  },
}));

export const userInfoViewFieldStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  label: {
    fontSize: '0.7rem',
    color: theme.palette.grey['400'],
  },
  text: {
    fontSize: '0.8rem',
  },
}));
