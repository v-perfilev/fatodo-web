import i18n from '../shared/i18n';
import {NotificationBuilder} from './notification.builder';
import Notification from '../model/notification.model';
import {VariantType} from 'notistack';

const getNotificationVariantFromStatus = (status: number): VariantType => {
  if (status >= 400 && status < 500) {
    return 'warning';
  }
  if (status >= 500) {
    return 'error';
  }
  return 'default';
};

const getTranslationFromResponse = (response: any): string => {
  const message = response?.data?.feedbackCode;
  return message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;
};

const getDefaultErrorTranslation = (): string => {
  const message = 'default';
  return message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;
};

const getConnectionErrorTranslation = (): string => {
  const message = 'connection';
  return message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;
};

export const handleStatusFromErrorResponse = (response: any, onUnauthenticated: () => void): void => {
  const status = response?.status;
  if (status === 403 || status === 401) {
    onUnauthenticated();
  }
};

export const handleNotificationFromErrorResponse = (
  response: any,
  enqueueSnackbar: (n: Notification) => void
): void => {
  const status = response?.status;
  let notification = null;
  const translatedMessage = getTranslationFromResponse(response);
  if (status && translatedMessage) {
    const variant = getNotificationVariantFromStatus(status);
    notification = new NotificationBuilder(translatedMessage).setVariant(variant).build();
  } else if (status >= 500) {
    const translatedMessage = getDefaultErrorTranslation();
    const variant = getNotificationVariantFromStatus(500);
    notification = new NotificationBuilder(translatedMessage).setVariant(variant).build();
  } else if (!status) {
    const translatedMessage = getConnectionErrorTranslation();
    const variant = getNotificationVariantFromStatus(500);
    notification = new NotificationBuilder(translatedMessage).setVariant(variant).build();
  }
  if (notification) {
    enqueueSnackbar(notification);
  }
};
