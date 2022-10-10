import {createMuiTheme, Theme} from '@material-ui/core';
import {bluePalette, defaultTypography, greenPalette, purplePalette, turquoisePalette, yellowPalette} from './sets';
import {ColorScheme} from './colors';
import {defaultOverrides} from './overrides';

class ThemeFactory {
  private static turquoiseTheme = createMuiTheme({
    palette: turquoisePalette,
    typography: defaultTypography,
    overrides: defaultOverrides,
  });

  private static yellowTheme = createMuiTheme({
    palette: yellowPalette,
    typography: defaultTypography,
    overrides: defaultOverrides,
  });

  private static purpleTheme = createMuiTheme({
    palette: purplePalette,
    typography: defaultTypography,
    overrides: defaultOverrides,
  });

  private static greenTheme = createMuiTheme({
    palette: greenPalette,
    typography: defaultTypography,
    overrides: defaultOverrides,
  });

  private static blueTheme = createMuiTheme({
    palette: bluePalette,
    typography: defaultTypography,
    overrides: defaultOverrides,
  });

  public static getDefaultTheme = (): Theme => ThemeFactory.turquoiseTheme;

  public static getTheme = (color: ColorScheme): Theme => {
    switch (color) {
      case 'turquoise':
        return ThemeFactory.turquoiseTheme;
      case 'yellow':
        return ThemeFactory.yellowTheme;
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

export default ThemeFactory;
