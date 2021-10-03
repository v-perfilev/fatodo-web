import {ReactElement} from 'react';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  text: string;
}
