import React from 'react';
import {Button, ThemeProvider} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import LoadingButton from '../controls/LoadingButton';
import {ThemeFactory} from '../../shared/theme/theme';
import ModalDialog from './ModalDialog';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  text?: string;
  loading?: boolean;
};

const theme = ThemeFactory.getDefaultTheme();

const ConfirmationDialog = ({open, title, text, onAgree, onDisagree, loading}: ConfirmationDialogProps) => {
  const {t} = useTranslation();

  const actions = (
    <>
      <Button onClick={onDisagree} color="primary">
        {t('buttons.disagree')}
      </Button>
      <LoadingButton onClick={onAgree} color="secondary" autoFocus loading={loading}>
        {t('buttons.agree')}
      </LoadingButton>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <ModalDialog
        isOpen={open}
        close={onDisagree}
        title={title}
        content={text}
        actions={actions}
        withText
        showCloseIcon
      />
    </ThemeProvider>
  );
};

export default ConfirmationDialog;
