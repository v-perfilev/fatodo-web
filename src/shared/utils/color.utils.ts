import {ClassNameMap} from '@material-ui/core/styles/withStyles';

export type GradientColor = 'yellow';

export class ColorUtils {

  public static getClassNameForGradientColor = (classes: ClassNameMap, color: GradientColor): string => {
    switch (color) {
      case 'yellow':
        return classes.yellow;
      default:
        return classes.yellow;
    }
  };

}

