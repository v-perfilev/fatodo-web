import {makeStyles, Theme} from '@material-ui/core/styles';

export const groupFormStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    display: 'none',
  },
}));

export const groupFormImageStyles = makeStyles((theme: Theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  preview: {
    marginBottom: theme.spacing(1),
  },
}));
