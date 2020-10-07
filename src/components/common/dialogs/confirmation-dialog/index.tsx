import React, {FC, ReactElement} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../controls/loading-button';

type Props = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title?: string;
  text?: string;
  loading?: boolean;
};

export const ConfirmationDialog: FC<Props> = ({open, title, text, onAgree, onDisagree, loading}: Props) => {
  const {t} = useTranslation();

  const DisagreeButton = (): ReactElement => (
    <Button onClick={onDisagree} color="primary">
      {t('buttons.disagree')}
    </Button>
  );

  const AgreeButton = (): ReactElement => (
    <LoadingButton onClick={onAgree} color="primary" autoFocus loading={loading}>
      {t('buttons.agree')}
    </LoadingButton>
  );

  return (
    <Dialog open={open}>
      {title && (
        <DialogTitle>
          {title}
        </DialogTitle>
      )}
      {text && (
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <DisagreeButton />
        <AgreeButton />
      </DialogActions>
    </Dialog>
  );
};
