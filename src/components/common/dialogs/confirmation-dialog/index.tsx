import React, {FC} from 'react';
import {Button, ThemeProvider} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../controls';
import {ThemeFactory} from '../../../../shared/theme/theme';
import ModalDialog from '../modal-dialog';

type Props = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  text?: string;
  loading?: boolean;
};

const ConfirmationDialog: FC<Props> = ({open, title, text, onAgree, onDisagree, loading}: Props) => {
  const {t} = useTranslation();

  const theme = ThemeFactory.getDefaultTheme();

  const disagreeButton = (
    <Button onClick={onDisagree} color="primary">
      {t('buttons.disagree')}
    </Button>
  );

  const agreeButton = (
    <LoadingButton onClick={onAgree} color="secondary" autoFocus loading={loading}>
      {t('buttons.agree')}
    </LoadingButton>
  );

  return (
    <ThemeProvider theme={theme}>
      <ModalDialog
        isOpen={open}
        close={onDisagree}
        title={title}
        content={text}
        actions={
          <>
            {disagreeButton}
            {agreeButton}
          </>
        }
        withText
        showCloseIcon
      />
    </ThemeProvider>
  );
};

export default ConfirmationDialog;
