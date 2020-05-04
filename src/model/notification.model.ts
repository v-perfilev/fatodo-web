import {OptionsObject, SnackbarMessage} from 'notistack';

export default interface Notification {
  message: SnackbarMessage;
  options?: OptionsObject;
}
