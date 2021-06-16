import {ReactElement} from 'react';

export interface AdditionalMenuItem {
  icon: ReactElement;
  action: () => void;
  tooltip: string;
}
