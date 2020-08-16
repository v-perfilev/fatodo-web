import {createMuiTheme} from '@material-ui/core';

export enum COLORS {
  PRIMARY = '#21b0a7',
  SECONDARY = '#ffba16',
  BLUE = '#21b0a7',
  GREEN = '#66bb6a',
  YELLOW = '#ffba16',
  RED = '#ff5722',
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
      main: COLORS.PRIMARY,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY,
      contrastText: COLORS.WHITE,
    },
    info: {
      main: COLORS.BLUE,
      contrastText: COLORS.WHITE,
    },
    success: {
      main: COLORS.GREEN,
      contrastText: COLORS.WHITE,
    },
    warning: {
      main: COLORS.YELLOW,
      contrastText: COLORS.WHITE,
    },
    error: {
      main: COLORS.RED,
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
