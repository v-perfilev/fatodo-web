import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    gradient: string;
  }

  interface Palette {
    gradient: string;
  }
}
