import {makeStyles} from '@material-ui/core/styles';
import {GRADIENT_COLORS} from '../theme';

export const gradientColors: GradientColor[] = ['yellow', 'turquoise', 'purple', 'green', 'blue'];
export type GradientColor = 'yellow' | 'turquoise' | 'purple' | 'green' | 'blue';

const gradientColorStyles = makeStyles(() => ({
  yellow: {background: GRADIENT_COLORS.YELLOW},
  turquoise: {background: GRADIENT_COLORS.TURQUOISE},
  purple: {background: GRADIENT_COLORS.PURPLE},
  green: {background: GRADIENT_COLORS.GREEN},
  blue: {background: GRADIENT_COLORS.BLUE},
}));

export class ColorUtils {

  static getGradientColorClass = (color: GradientColor): string => {
    const classes = gradientColorStyles();
    switch (color) {
      case 'turquoise':
        return classes.turquoise;
      case 'purple':
        return classes.purple;
      case 'green':
        return classes.green;
      case 'blue':
        return classes.blue;
      default:
        return classes.yellow;
    }
  };

}
