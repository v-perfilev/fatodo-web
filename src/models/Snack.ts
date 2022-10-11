import {VariantType} from 'notistack';

export type SnackVariant = 'info' | 'warning' | 'error';

export interface ReduxSnack extends Snack {
  key: string;
  dismissed: boolean;
}

export interface Snack {
  message: string;
  variant: VariantType;
}

export class SnackBuilder {
  private readonly snack: Snack;

  constructor(message: string) {
    this.snack = {message, variant: 'info'};
  }

  setVariantColor(variant: SnackVariant): SnackBuilder {
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

  private static getVariantFromStatus = (status: number): SnackVariant => {
    if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'info';
    }
  };
}
