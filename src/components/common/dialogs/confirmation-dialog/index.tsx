import React, {FC, ReactElement} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../controls/loading-button';
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

export const ConfirmationDialog: FC<Props> = ({open, title, text, onAgree, onDisagree, loading}: Props) => {
  const classes = confirmationDialogStyles();
  const {t} = useTranslation();

  const theme = ThemeFactory.getDefaultTheme();

  const DisagreeButton = (): ReactElement => (
    <Button onClick={onDisagree} color="primary">
      {t('buttons.disagree')}
    </Button>
  );

  const AgreeButton = (): ReactElement => (
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
          <DisagreeButton />
          <AgreeButton />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
