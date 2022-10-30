import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from './ModalDialog';
import {Breakpoint} from '@mui/system';
import {Button} from '@mui/material';
import LoadingButton from '../controls/LoadingButton';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  content: ReactElement | string;
  loading?: boolean;
  size?: Breakpoint;
};

const ConfirmationDialog = ({open, onAgree, onDisagree, title, content, loading, size}: ConfirmationDialogProps) => {
  const {t} = useTranslation();

  const actions = (
    <>
      <Button variant="text" color="secondary" disabled={loading} onClick={onDisagree}>
        {t('buttons.disagree')}
      </Button>
      <LoadingButton variant="text" color="primary" disabled={loading} loading={loading} onClick={onAgree}>
        {t('buttons.agree')}
      </LoadingButton>
    </>
  );

  return <ModalDialog open={open} close={onDisagree} title={title} content={content} actions={actions} size={size} />;
};

export default ConfirmationDialog;
