import React, {ComponentType, FC, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {formDialogStyles} from './_styles';
import {LoadingButton} from '../../controls';

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
  const classes = formDialogStyles();
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
    <Dialog open={show} onClose={close}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>
        <FormComponent {...{close, setIsSubmitting, setIsValid, setSubmitForm, setResetForm}} />
      </DialogContent>
      <DialogActions>
        {cancelButton}
        {sendButton}
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
