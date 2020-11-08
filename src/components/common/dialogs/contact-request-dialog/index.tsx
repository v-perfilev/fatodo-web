import {useTranslation} from 'react-i18next';
import React, {FC, ReactElement, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {LoadingButton} from '../../controls/loading-button';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const ContactRequestDialog: FC<Props> = ({show, setShow}: Props) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const close = (): void => {
    setShow(false);
  };

  const send = (): void => {
    setLoading(true);
  };

  const CancelButton = (): ReactElement => (
    <Button onClick={close} color="primary">
      {t('buttons.disagree')}
    </Button>
  );

  const SendButton = (): ReactElement => (
    <LoadingButton onClick={send} color="secondary" autoFocus loading={loading}>
      {t('buttons.agree')}
    </LoadingButton>
  );

  return (
    <Dialog open={show} onClose={close}>
      <DialogTitle>Test title</DialogTitle>
      <DialogContent>
        <DialogContentText>Test text</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton />
        <SendButton />
      </DialogActions>
    </Dialog>
  );
};

export default ContactRequestDialog;
