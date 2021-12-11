import React, {ComponentType, FC, useState} from 'react';
import {Button} from '@material-ui/core';
import {LoadingButton} from '../../controls';
import ModalDialog from '../modal-dialog/modal-dialog';

export type FormDialogComponentProps = {
  close: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsValid: (isValid: boolean) => void;
  setSubmitForm: (callback: () => () => void) => void;
  setResetForm: (callback: () => () => void) => void;
  params?: any;
};

type Props = {
  show: boolean;
  close: () => void;
  FormComponent: ComponentType<FormDialogComponentProps>;
  title: string;
  sendText: string;
  cancelText: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  params?: any;
};

const FormDialog: FC<Props> = (props: Props) => {
  const {show, close: closeDialog, title, sendText, cancelText, FormComponent, size, params} = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [submitForm, setSubmitForm] = useState(() => (): void => {
    // important stub function
  });
  const [resetForm, setResetForm] = useState(() => (): void => {
    // important stub function
  });

  const close = (): void => {
    closeDialog();
    resetForm();
  };

  const content = <FormComponent {...{close, setIsSubmitting, setIsValid, setSubmitForm, setResetForm, params}} />;

  const actions = (
    <>
      <Button onClick={close} color="primary" disabled={isSubmitting}>
        {cancelText}
      </Button>
      <LoadingButton color="secondary" disabled={isSubmitting || !isValid} loading={isSubmitting} onClick={submitForm}>
        {sendText}
      </LoadingButton>
    </>
  );

  return (
    <ModalDialog
      isOpen={show}
      close={close}
      title={title}
      content={content}
      actions={actions}
      size={size}
      showCloseIcon
    />
  );
};

export default FormDialog;
