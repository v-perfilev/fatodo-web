import {ReactElement} from 'react';
import {PropTypes} from '@material-ui/core';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  text: string;
  color?: PropTypes.Color;
  disabled?: boolean;
  hidden?: boolean;
  hiddenInControlMenu?: boolean;
  loading?: boolean;
}
