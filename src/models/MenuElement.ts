import {ReactElement} from 'react';
import {ColorScheme} from '../shared/themes/colors';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  color?: ColorScheme;
  disabled?: boolean;
  hidden?: boolean;
  loading?: boolean;
}
