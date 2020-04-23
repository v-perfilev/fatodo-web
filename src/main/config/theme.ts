import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#20b2aa',
      contrastText: '#f1f1f1',
    },
    secondary: {
      main: '#daa520',
      contrastText: '#f1f1f1',
    }
  },
  typography: {
    fontFamily: 'Roboto, serif',
  }
});
