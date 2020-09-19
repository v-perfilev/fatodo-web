import {createMuiTheme, Theme} from '@material-ui/core';
import {
  bluePalette,
  defaultPalette,
  defaultTypography,
  greenPalette,
  purplePalette,
  turquoisePalette,
  yellowPalette,
} from './sets';
import {ColorScheme} from './colors';

export class ThemeFactory {
  private static yellowTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...defaultPalette,
      ...yellowPalette,
    },
    typography: defaultTypography,
  });

  private static turquoiseTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...defaultPalette,
      ...turquoisePalette,
    },
    typography: defaultTypography,
  });

  private static purpleTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...defaultPalette,
      ...purplePalette,
    },
    typography: defaultTypography,
  });

  private static greenTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...defaultPalette,
      ...greenPalette,
    },
    typography: defaultTypography,
  });

  private static blueTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...defaultPalette,
      ...bluePalette,
    },
    typography: defaultTypography,
  });

  public static getDefaultTheme = (): Theme => ThemeFactory.yellowTheme;

  public static getTheme = (color: ColorScheme): Theme => {
    switch (color) {
      case 'yellow':
        return ThemeFactory.yellowTheme;
      case 'turquoise':
        return ThemeFactory.turquoiseTheme;
      case 'purple':
        return ThemeFactory.purpleTheme;
      case 'green':
        return ThemeFactory.greenTheme;
      case 'blue':
        return ThemeFactory.blueTheme;
      default:
        return ThemeFactory.getDefaultTheme();
    }
  };
}
