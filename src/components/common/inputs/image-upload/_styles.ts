import {makeStyles, Theme} from '@material-ui/core/styles';

export const imageUploadButtonsStyles = makeStyles((theme: Theme) => ({
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

export const imageUploadPopoverStyles = makeStyles((theme: Theme) => ({
  popoverBody: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 325,
    padding: theme.spacing(1.5),
  },
  invalidBody: {
    background: theme.palette.error.light,
  },
}));

export const imageUploadLabelStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

export const imageUploadPreviewStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

