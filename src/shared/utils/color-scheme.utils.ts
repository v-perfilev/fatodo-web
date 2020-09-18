import {makeStyles} from '@material-ui/core/styles';
import {COLORS, GRADIENT_COLORS} from '../theme';

export const colorSchemes: ColorScheme[] = ['yellow', 'turquoise', 'purple', 'green', 'blue'];
export type ColorScheme = 'yellow' | 'turquoise' | 'purple' | 'green' | 'blue';

const colorSchemeStyles = makeStyles(() => ({
  primaryYellowScheme: {color: COLORS.TURQUOISE},
  primaryTurquoiseScheme: {color: COLORS.TURQUOISE},
  primaryPurpleScheme: {color: COLORS.PURPLE},
  primaryGreenScheme: {color: COLORS.GREEN},
  primaryBlueScheme: {color: COLORS.BLUE},

  secondaryYellowScheme: {color: COLORS.TURQUOISE},
  secondaryTurquoiseScheme: {color: COLORS.WHITE},
  secondaryPurpleScheme: {color: COLORS.WHITE},
  secondaryGreenScheme: {color: COLORS.WHITE},
  secondaryBlueScheme: {color: COLORS.WHITE},

  bgYellowScheme: {background: GRADIENT_COLORS.YELLOW},
  bgTurquoiseScheme: {background: GRADIENT_COLORS.TURQUOISE},
  bgPurpleScheme: {background: GRADIENT_COLORS.PURPLE},
  bgGreenScheme: {background: GRADIENT_COLORS.GREEN},
  bgBlueScheme: {background: GRADIENT_COLORS.BLUE},
}));

export class ColorSchemeUtils {

  static getPrimaryClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.primaryTurquoiseScheme;
      case 'purple':
        return classes.primaryPurpleScheme;
      case 'green':
        return classes.primaryGreenScheme;
      case 'blue':
        return classes.primaryBlueScheme;
      default:
        return classes.primaryYellowScheme;
    }
  };

  static getSecondaryClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.secondaryTurquoiseScheme;
      case 'purple':
        return classes.secondaryPurpleScheme;
      case 'green':
        return classes.secondaryGreenScheme;
      case 'blue':
        return classes.secondaryBlueScheme;
      default:
        return classes.secondaryYellowScheme;
    }
  };

  static getBackgroundClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.bgTurquoiseScheme;
      case 'purple':
        return classes.bgPurpleScheme;
      case 'green':
        return classes.bgGreenScheme;
      case 'blue':
        return classes.bgBlueScheme;
      default:
        return classes.bgYellowScheme;
    }
  };

}
