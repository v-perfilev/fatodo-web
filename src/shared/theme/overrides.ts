import {Overrides} from '@material-ui/core/styles/overrides';

export const defaultOverrides = {
  MuiTypography: {
    h6: {
      fontSize: '1rem',
    },
  },
  MuiDialog: {
    paperWidthXs: {
      maxWidth: 200,
    },
    paperWidthSm: {
      maxWidth: 350,
    },
    paperWidthMd: {
      maxWidth: 500,
    }
  }
} as Overrides;
