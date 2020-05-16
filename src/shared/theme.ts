import {createMuiTheme} from '@material-ui/core';

export enum COLORS {
  MAIN = '#21b0a7',
  // SECONDARY = '#ffb300',
  SECONDARY = '#ffba16',
  // SECONDARY = '#ffc335',
  INFO = '#29b6f6',
  SUCCESS = '#66bb6a',
  WARNING = '#e2ae00',
  ERROR = '#ff5722',
  WHITE = '#f1f1f1',
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
    h1: {
      fontFamily: 'Didact Gothic, serif',
      fontWeight: 300,
      fontSize: '2rem',
      letterSpacing: '0.05em',
    },
  },
});
