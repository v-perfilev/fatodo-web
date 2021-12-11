import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import ContactRequestDialog, {
  ContactRequestDialogProps,
  defaultContactRequestDialogProps,
} from '../../../pages/contact/dialogs/contact-request-dialog/contact-request-dialog';
import {ContactDialogContext} from '../../contexts/dialog-contexts/contact-dialog-context';

enum ContactDialogs {
  REQUEST = 'CONTACT_REQUEST_DIALOG',
}

const withContactDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showContactRequestDialog = useCallback(
    (onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => {
        if (onSuccess) onSuccess();
        clearDialogProps(ContactDialogs.REQUEST);
      };
      const props = {show, close} as ContactRequestDialogProps;
      setDialogProps(ContactDialogs.REQUEST, props);
    },
    [setDialogProps, clearDialogProps]
  );

  const initDialogs = (): void => {
    handleDialog(ContactDialogs.REQUEST, ContactRequestDialog, defaultContactRequestDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showContactRequestDialog,
  };

  return (
    <ContactDialogContext.Provider value={context}>
      <Component {...props} />
    </ContactDialogContext.Provider>
  );
};

export default withContactDialogs;
