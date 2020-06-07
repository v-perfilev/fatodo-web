import i18n from '../i18n';
import {VariantType} from 'notistack';
import {AxiosResponse} from 'axios';
import {NotificationBuilder} from '../notification/notification.builder';
import Notification from '../../models/notification.model';

export class ResponseUtils {
  public static getFeedbackTranslation = (message: string): string =>
    message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;

  public static getNotificationVariant = (status: number): VariantType => {
    if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'default';
    }
  };

  public static handleNotification = (
    response: AxiosResponse,
    allowedCodes: string[] | '*',
    enqueueSnackbar: (n: Notification) => void
  ): void => {
    const feedbackCode = response?.data?.feedbackCode;
    const status = response?.status;
    const isFeedBackCorrect = feedbackCode && (allowedCodes === '*' || allowedCodes.includes(feedbackCode));
    const isStatusCorrect = status && status < 500;
    const notification =
      isFeedBackCorrect && isStatusCorrect
        ? new NotificationBuilder(ResponseUtils.getFeedbackTranslation(feedbackCode))
            .setVariant(ResponseUtils.getNotificationVariant(status))
            .build()
        : null;
    if (notification) {
      enqueueSnackbar(notification);
    }
  };
}
