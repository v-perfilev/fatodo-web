import { OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar } from 'notistack';
import * as React from 'react';
import { IRootState } from '../redux';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { removeSnackbar } from '../redux/actions/notification.actions';

export interface Notification {
  message: SnackbarMessage,
  options?: OptionsObject,
}

interface INotifierProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
  closeSnackbar: (key: SnackbarKey) => void,
}

export interface INotifierState {
  displayed: SnackbarKey[],
}

class Notifier extends React.Component<INotifierProps & PropsFromRedux, INotifierState> {
  state = {
    displayed: [],
  };

  componentDidUpdate(prevProps): void {
    if (this.props !== prevProps) {
      this.handlingLoop();
    }
  }

  handlingLoop = () => {
    const { notificationState, enqueueSnackbar, closeSnackbar, removeSnackbar } = this.props;
    const { displayed } = this.state;

    notificationState.list.forEach(({ message, options, key, dismissed = false }) => {

      if (dismissed) {
        closeSnackbar(key);
        return;
      }
      if (displayed.includes(key)) {
        return;
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, k) => {
          if (options?.onClose) {
            options.onClose(event, reason, k);
          }
        },
        onExited: (event, k) => {
          removeSnackbar(k)
          this.removeDisplayed(k);
        },
      });

      this.addDisplayed(key);
    });
  }

  addDisplayed = (key: SnackbarKey) => {
    this.setState(state => {
      state.displayed.push(key);
    });
  };

  removeDisplayed = (key: SnackbarKey) => {
    this.setState(state => {
      state.displayed.filter(k => k != key);
    });
  };

  render = () => null;
}

const mapStateToProps = ({ notificationState }: IRootState) => ({
  notificationState
});
const mapDispatchToProps = {
  removeSnackbar
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose(
  connector,
  withSnackbar
)(Notifier)
