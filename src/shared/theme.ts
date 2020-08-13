import {createMuiTheme} from '@material-ui/core';

export enum COLORS {
  MAIN = '#21b0a7',
  SECONDARY = '#ffba16',
  INFO = '#21b0a7',
  SUCCESS = '#66bb6a',
  WARNING = '#ffba16',
  ERROR = '#ff5722',
  WHITE = '#ffffff',
  LIGHT_GREY = '#e0e0e0',
  GREY = '#aaaaaa',
  BLACK = '#222222',
}

export enum GRADIENT_COLORS {
  YELLOW = 'linear-gradient(175deg, rgba(255,186,22,1) 30%, rgba(255,216,46,1) 90%)',
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
    background: {
      default: COLORS.WHITE,
    },
  },
  typography: {
    fontFamily: 'Roboto, serif',
  },
});
