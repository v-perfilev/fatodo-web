import {ReactElement} from 'react';
import {PropTypes} from '@material-ui/core';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  text: string;
  color?: PropTypes.Color;
  loading?: any;
}
