import {makeStyles} from '@material-ui/core/styles';
import {COLORS, GRADIENT_COLORS} from '../theme';

export const colorSchemes: ColorScheme[] = ['yellow', 'turquoise', 'purple', 'green', 'blue'];
export type ColorScheme = 'yellow' | 'turquoise' | 'purple' | 'green' | 'blue';

const colorSchemeStyles = makeStyles(() => ({
  titleYellowScheme: {color: COLORS.TURQUOISE},
  titleTurquoiseScheme: {color: COLORS.TURQUOISE},
  titlePurpleScheme: {color: COLORS.PURPLE},
  titleGreenScheme: {color: COLORS.GREEN},
  titleBlueScheme: {color: COLORS.BLUE},

  primaryBorderYellowScheme: {borderColor: COLORS.TURQUOISE},
  primaryBorderTurquoiseScheme: {borderColor: COLORS.TURQUOISE},
  primaryBorderPurpleScheme: {borderColor: COLORS.PURPLE},
  primaryBorderGreenScheme: {borderColor: COLORS.GREEN},
  primaryBorderBlueScheme: {borderColor: COLORS.BLUE},

  secondaryBorderYellowScheme: {borderColor: COLORS.TURQUOISE},
  secondaryBorderTurquoiseScheme: {borderColor: COLORS.WHITE},
  secondaryBorderPurpleScheme: {borderColor: COLORS.WHITE},
  secondaryBorderGreenScheme: {borderColor: COLORS.WHITE},
  secondaryBorderBlueScheme: {borderColor: COLORS.WHITE},

  bgYellowScheme: {background: GRADIENT_COLORS.YELLOW},
  bgTurquoiseScheme: {background: GRADIENT_COLORS.TURQUOISE},
  bgPurpleScheme: {background: GRADIENT_COLORS.PURPLE},
  bgGreenScheme: {background: GRADIENT_COLORS.GREEN},
  bgBlueScheme: {background: GRADIENT_COLORS.BLUE},
}));

export class ColorSchemeUtils {

  static getTitleClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.titleTurquoiseScheme;
      case 'purple':
        return classes.titlePurpleScheme;
      case 'green':
        return classes.titleGreenScheme;
      case 'blue':
        return classes.titleBlueScheme;
      default:
        return classes.titleYellowScheme;
    }
  };

  static getPrimaryBorderClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.primaryBorderTurquoiseScheme;
      case 'purple':
        return classes.primaryBorderPurpleScheme;
      case 'green':
        return classes.primaryBorderGreenScheme;
      case 'blue':
        return classes.primaryBorderBlueScheme;
      default:
        return classes.primaryBorderYellowScheme;
    }
  };

  static getSecondaryBorderClass = (color: ColorScheme): string => {
    const classes = colorSchemeStyles();
    switch (color) {
      case 'turquoise':
        return classes.secondaryBorderTurquoiseScheme;
      case 'purple':
        return classes.secondaryBorderPurpleScheme;
      case 'green':
        return classes.secondaryBorderGreenScheme;
      case 'blue':
        return classes.secondaryBorderBlueScheme;
      default:
        return classes.secondaryBorderYellowScheme;
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
