import { makeStyles, Theme } from '@material-ui/core/styles';

export const remindersInputStyles = makeStyles(() => ({
  root: {
    '& input': {
      flexShrink: 100,
    },
  },
}));

export const remindersInputChipsStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  chip: {
    margin: 3,
  },
}));

export const remindersInputPopoverStyles = makeStyles(() => ({
  popoverBody: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 325,
    minWidth: 310,
    minHeight: 305,
    overflowX: 'hidden',
  },
}));

export const remindersInputPopoverToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(1),
  },
  button: {
    color: 'rgba(255, 255, 255, 0.7) !important',
    border: '1px solid ' + 'rgba(255, 255, 255, 0.7) !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
    },
    '&.Mui-selected': {
      color: 'rgba(255, 255, 255, 1) !important',
      backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25) !important',
      },
    },
  },
  typography: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.2rem',
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
  }
}));

export const remindersInputPopoverItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    '& > *': {
      width: '80%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));
