import i18n from '../shared/i18n';
import { NotificationBuilder } from './notification.builder';
import Notification from '../model/notification.model';

export const handleStatusFromErrorResponse = (response: any, onUnauthenticated: () => void) => {
  const status = response?.status;
  if (status === 403 || status === 401) {
    onUnauthenticated();
  }
};

export const handleNotificationFromErrorResponse = (response: any, enqueueSnackbar: (n: Notification) => void) => {
  const status = response?.status;
  let notification = null;
  const translatedMessage = getTranslationFromResponse(response);
  if (status && translatedMessage) {
    const variant = getNotificationVariantFromStatus(status);
    notification = new NotificationBuilder(translatedMessage).setVariant(variant).build();
  } else if (!status || status >= 500) {
    const translatedMessage = getDefaultErrorTranslation();
    const variant = getNotificationVariantFromStatus(500);
    notification = new NotificationBuilder(translatedMessage).setVariant(variant).build();
  }
  if (notification) {
    enqueueSnackbar(notification);
  }
};

const getNotificationVariantFromStatus = (status: number) => {
  if (status >= 400 && status < 500) {
    return 'warning';
  }
  if (status >= 500) {
    return 'error';
  }
  return 'default';
};

const getTranslationFromResponse = (response: any) => {
  const message = response?.data?.feedbackCode;
  return message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;
};

const getDefaultErrorTranslation = () => {
  const message = 'default';
  return message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;
};
