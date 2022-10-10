import {PaletteColor} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tertiary: PaletteColor;
    gradient: string;
  }
}
