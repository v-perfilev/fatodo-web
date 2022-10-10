import {bluePalette, defaultTypography, greenPalette, purplePalette, turquoisePalette, yellowPalette} from './sets';
import {ColorScheme} from './colors';
import {createTheme, Theme} from '@mui/material';

class ThemeFactory {
  private static turquoiseTheme = createTheme({
    palette: turquoisePalette,
    typography: defaultTypography,
  });

  private static yellowTheme = createTheme({
    palette: yellowPalette,
    typography: defaultTypography,
  });

  private static purpleTheme = createTheme({
    palette: purplePalette,
    typography: defaultTypography,
  });

  private static greenTheme = createTheme({
    palette: greenPalette,
    typography: defaultTypography,
  });

  private static blueTheme = createTheme({
    palette: bluePalette,
    typography: defaultTypography,
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
