import {createMuiTheme} from '@material-ui/core';

export enum COLORS {
  MAIN = '#21b0a7',
  SECONDARY = '#ffba16',
  INFO = '#21b0a7',
  SUCCESS = '#66bb6a',
  WARNING = '#ffba16',
  ERROR = '#ff5722',
  WHITE = '#fafafa',
  BLACK = '#222222',
}

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: COLORS.MAIN,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY,
      contrastText: COLORS.WHITE,
    },
    info: {
      main: COLORS.INFO,
      contrastText: COLORS.WHITE,
    },
    success: {
      main: COLORS.SUCCESS,
      contrastText: COLORS.WHITE,
    },
    warning: {
      main: COLORS.WARNING,
      contrastText: COLORS.WHITE,
    },
    error: {
      main: COLORS.ERROR,
      contrastText: COLORS.WHITE,
    },
    text: {
      primary: COLORS.BLACK,
    },
  },
  typography: {
    fontFamily: 'Roboto, serif',
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        '&[class*="variantInfo"]': {
          backgroundColor: COLORS.INFO,
        },
        '&[class*="variantSuccess"]': {
          backgroundColor: COLORS.SUCCESS,
        },
        '&[class*="variantWarning"]': {
          backgroundColor: COLORS.WARNING,
        },
        '&[class*="variantError"]': {
          backgroundColor: COLORS.ERROR,
        },
      },
    },
  },
});
