import React, {FC} from 'react';
import {Button, ThemeProvider} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../controls';
import {ThemeFactory} from '../../../shared/theme/theme';
import ModalDialog from '../modal-dialog/modal-dialog';

type Props = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  text?: string;
  loading?: boolean;
};

const theme = ThemeFactory.getDefaultTheme();

const ConfirmationDialog: FC<Props> = ({open, title, text, onAgree, onDisagree, loading}: Props) => {
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
