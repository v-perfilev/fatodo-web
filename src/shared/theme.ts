import {createMuiTheme} from '@material-ui/core';

export enum COLORS {
  PRIMARY = '#21b0a7',
  SECONDARY = '#ffba16',
  INFO = '#21b0a7',
  SUCCESS = '#66bb6a',
  WARNING = '#ffba16',
  ERROR = '#ff5722',
  WHITE = '#ffffff',
  LIGHT_GREY = '#e0e0e0',
  GREY = '#aaaaaa',
  DARK_GREY = '#888888',
  BLACK = '#222222',
  YELLOW = '#ffba16',
  TURQUOISE = '#21af9c',
  PURPLE = '#9f15fe',
  GREEN = '#0fa21a',
  BLUE = '#0052f9',
}

export enum GRADIENT_COLORS {
  YELLOW = 'linear-gradient(175deg, rgba(255,186,22,1) 30%, rgba(255,216,46,1) 90%)',
  TURQUOISE = 'linear-gradient(175deg, rgba(33,175,156,1) 30%, rgba(81,227,218,1) 90%)',
  PURPLE = 'linear-gradient(175deg, rgba(159,21,254,1) 30%, rgba(229,45,254,1) 90%)',
  GREEN = 'linear-gradient(175deg, rgba(15,162,26,1) 30%, rgba(94,236,105,1) 90%)',
  BLUE = 'linear-gradient(175deg, rgba(0,82,249,1) 30%, rgba(101,152,255,1) 90%)',
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
