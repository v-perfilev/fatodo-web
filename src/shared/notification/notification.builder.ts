import Snack from '../../models/snack.model';
import {SnackbarAction, SnackbarMessage, SnackbarOrigin, VariantType} from 'notistack';

export class NotificationBuilder {
  private readonly notification: Snack;

  constructor(message: SnackbarMessage) {
    this.notification = {message, options: {}};
  }

  setVariant(variant: VariantType): NotificationBuilder {
    this.notification.options.variant = variant;
    return this;
  }

  setOrigin(origin: SnackbarOrigin): NotificationBuilder {
    this.notification.options.anchorOrigin = origin;
    return this;
  }

  setAction(action: SnackbarAction): NotificationBuilder {
    this.notification.options.action = action;
    return this;
  }

  setPersist(persist: boolean): NotificationBuilder {
    this.notification.options.persist = persist;
    return this;
  }

  build(): Snack {
    return this.notification;
  }
}
