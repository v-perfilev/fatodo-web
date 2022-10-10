import Snack from '../../../models/snack.model';
import {SnackbarAction, SnackbarMessage, SnackbarOrigin, VariantType} from 'notistack';

export class SnackBuilder {
  private readonly snack: Snack;

  constructor(message: SnackbarMessage) {
    this.snack = {message, options: {}};
  }

  setVariant(variant: VariantType): SnackBuilder {
    this.snack.options.variant = variant;
    return this;
  }

  setOrigin(origin: SnackbarOrigin): SnackBuilder {
    this.snack.options.anchorOrigin = origin;
    return this;
  }

  setAction(action: SnackbarAction): SnackBuilder {
    this.snack.options.action = action;
    return this;
  }

  setPersist(persist: boolean): SnackBuilder {
    this.snack.options.persist = persist;
    return this;
  }

  build(): Snack {
    return this.snack;
  }
}
