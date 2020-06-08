import {VariantType} from 'notistack';
import {AxiosResponse} from 'axios';
import {NotificationBuilder} from '../notification/notification.builder';
import Notification from '../../models/notification.model';
import {TranslationUtils} from './translation.utils';

export class NotificationUtils {

  public static getVariantFromStatus = (status: number): VariantType => {
    if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'info';
    }
  };

  public static handleFeedback = (
    response: AxiosResponse,
    allowedCodes: string[] | '*',
    enqueueSnackbar: (n: Notification) => void,
  ): void => {
    const feedbackCode = response?.data?.feedbackCode;
    const status = response?.status;
    const isFeedBackCorrect = feedbackCode && (allowedCodes === '*' || allowedCodes.includes(feedbackCode));
    const isStatusCorrect = status && status < 500;
    const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
    const notification = isFeedBackCorrect && isStatusCorrect && message
      ? new NotificationBuilder(message)
        .setVariant(NotificationUtils.getVariantFromStatus(status))
        .build()
      : null;
    if (notification) {
      enqueueSnackbar(notification);
    }
  };

  public static handleSnack = (code: string, variant: VariantType, enqueueSnackbar: (n: Notification) => void) => {
    const message = TranslationUtils.getSnackTranslation(code);
    const notification = message
      ? new NotificationBuilder(message).setVariant(variant).build()
      : null;
    if (notification) {
      enqueueSnackbar(notification);
    }
  };
}
