// @ts-ignore
import {Palette} from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    gradient: string;
  }
}
