import {VariantType} from 'notistack';
import {AxiosResponse} from 'axios';
import {NotificationBuilder} from './notification.builder';
import Snack from '../../models/snack.model';
import {TranslationUtils} from '../utils/translation.utils';
import {ResponseUtils} from '../utils/response.utils';

interface SetupNotificationActions {
  enqueueSnackbar: (notification: Snack) => void;
}

export const setupNotification = (actions: SetupNotificationActions): void => {
  Notification.use(actions.enqueueSnackbar);
};

export class Notification {

  private static enqueueSnackbar: (n: Snack) => void;

  public static use = (enqueueSnackbar: (n: Snack) => void): void => {
    Notification.enqueueSnackbar = enqueueSnackbar;
  };

  public static handleFeedback = (
    response: AxiosResponse,
    allowedCodes: string[] | '*' = '*',
    excludedCodes: string[] | '' = '',
  ): void => {
    const feedbackCode = ResponseUtils.getFeedbackCode(response);
    const status = ResponseUtils.getStatus(response);
    const isFeedBackCorrect =
      feedbackCode &&
      (allowedCodes === '*' || allowedCodes.includes(feedbackCode)) &&
      (excludedCodes === '' || !excludedCodes.includes(feedbackCode));
    const isStatusCorrect = status && status < 500;
    const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
    const notification =
      isFeedBackCorrect && isStatusCorrect && message
        ? new NotificationBuilder(message).setVariant(Notification.getVariantFromStatus(status)).build()
        : null;
    if (notification) {
      Notification.enqueueSnackbar(notification);
    }
  };

  public static handleSnack = (
    code: string,
    variant: VariantType,
  ): void => {
    const message = TranslationUtils.getSnackTranslation(code);
    const notification = message ? new NotificationBuilder(message).setVariant(variant).build() : null;
    if (notification) {
      Notification.enqueueSnackbar(notification);
    }
  };

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
