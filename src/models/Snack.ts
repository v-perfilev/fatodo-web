import {VariantType} from 'notistack';

export interface ReduxSnack extends Snack {
  key: string;
  dismissed: boolean;
}

export interface Snack {
  message: string;
  variant: Omit<VariantType, 'default' | 'success'>;
}

export class SnackBuilder {
  private readonly snack: Snack;

  constructor(message: string) {
    this.snack = {message, variant: 'info'};
  }

  setVariantColor(variant: Omit<VariantType, 'default' | 'success'>): SnackBuilder {
    this.snack.variant = variant;
    return this;
  }

  setStatusColor(status: number): SnackBuilder {
    this.snack.variant = SnackBuilder.getVariantFromStatus(status);
    return this;
  }

  build(): Snack {
    return this.snack;
  }

  private static getVariantFromStatus = (status: number): VariantType => {
    if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'info';
    }
  };
}
