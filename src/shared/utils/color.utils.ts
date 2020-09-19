import {ColorScheme, GRADIENT_COLORS} from '../theme/colors';

export class ColorUtils {

  public static getGradientColor = (color: ColorScheme): string => {
    switch (color) {
      case 'turquoise':
        return GRADIENT_COLORS.TURQUOISE;
      case 'yellow':
        return GRADIENT_COLORS.YELLOW;
      case 'purple':
        return GRADIENT_COLORS.PURPLE;
      case 'green':
        return GRADIENT_COLORS.GREEN;
      case 'blue':
        return GRADIENT_COLORS.BLUE;
      default:
        return '#fff';
    }
  };

}
