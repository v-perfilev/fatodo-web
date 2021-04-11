import React, {ComponentType, FC, useState} from 'react';
import {Button} from '@material-ui/core';
import {LoadingButton} from '../../controls';
import ModalDialog from '../modal-dialog';

export type FormDialogComponentProps = {
  close: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsValid: (isValid: boolean) => void;
  setSubmitForm: (callback: () => () => void) => void;
  setResetForm: (callback: () => () => void) => void;
};

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  FormComponent: ComponentType<FormDialogComponentProps>;
  title: string;
  sendText: string;
  cancelText: string;
};

const FormDialog: FC<Props> = ({show, setShow, title, sendText, cancelText, FormComponent}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [submitForm, setSubmitForm] = useState(() => (): void => {
    // important stub function
  });
  const [resetForm, setResetForm] = useState(() => (): void => {
    // important stub function
  });

  const close = (): void => {
    setShow(false);
    resetForm();
  };

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {cancelText}
    </Button>
  );

  const sendButton = (
    <LoadingButton color="secondary" disabled={isSubmitting || !isValid} loading={isSubmitting} onClick={submitForm}>
      {sendText}
    </LoadingButton>
  );

  return (
    <ModalDialog
      isOpen={show}
      close={close}
      title={title}
      content={<FormComponent {...{close, setIsSubmitting, setIsValid, setSubmitForm, setResetForm}} />}
      actions={
        <>
          {cancelButton}
          {sendButton}
        </>
      }
      showCloseIcon
    />
  );
};

export default FormDialog;
