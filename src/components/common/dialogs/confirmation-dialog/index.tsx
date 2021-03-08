import React, {FC} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../controls';
import {ThemeFactory} from '../../../../shared/theme/theme';
import {confirmationDialogStyles} from './_styles';

type Props = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title?: string;
  text?: string;
  loading?: boolean;
};

const ConfirmationDialog: FC<Props> = ({open, title, text, onAgree, onDisagree, loading}: Props) => {
  const classes = confirmationDialogStyles();
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
      <Dialog open={open}>
        {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        {text && (
          <DialogContent className={classes.content}>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {disagreeButton}
          {agreeButton}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ConfirmationDialog;
