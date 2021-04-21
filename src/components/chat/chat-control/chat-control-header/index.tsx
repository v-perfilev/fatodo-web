import React, {ChangeEvent, FC} from 'react';
import {Box, Fab} from '@material-ui/core';
import {ClearableTextInput} from '../../../common/inputs';
import {chatControlHeaderStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../common/icons/plus-icon';
import {ChatDialogs} from '../../_router';
import {ChatCreateDialogProps} from '../../dialogs/chat-create-dialog';
import {useDialogsContext} from '../../../../shared/contexts/dialogs-context';

type Props = {
  setFilter: (filter: string) => void;
};

const ChatControlHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = chatControlHeaderStyles();
  const {t} = useTranslation();
  const {setDialogProps, clearDialogProps} = useDialogsContext();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const showChatCreateDialog = (): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.CREATE);
    const props = {show, close} as ChatCreateDialogProps;
    setDialogProps(ChatDialogs.CREATE, props);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleOnChange} fullWidth />
      <Fab className={classes.button} size="small" color="primary" onClick={showChatCreateDialog}>
        <PlusIcon />
      </Fab>
    </Box>
  );
};

export default ChatControlHeader;
