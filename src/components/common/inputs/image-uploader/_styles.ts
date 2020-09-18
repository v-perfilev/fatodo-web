import {makeStyles, Theme} from '@material-ui/core/styles';

export const imageUploaderStyles = makeStyles((theme: Theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
}));

export const imageUploaderPreview = makeStyles((theme: Theme) => ({
  image: {
    marginBottom: theme.spacing(1),
  },
}));

export const imageUploaderButtonsStyles = makeStyles((theme: Theme) => ({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  input: {
    display: 'none',
  },
}));

export const imageUploaderPopoverStyles = makeStyles((theme: Theme) => ({
  popoverBody: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 325,
    padding: theme.spacing(1.5),
  },
}));