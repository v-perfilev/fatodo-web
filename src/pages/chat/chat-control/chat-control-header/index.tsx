import React, {ChangeEvent, FC} from 'react';
import {Box, Fab} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import {chatControlHeaderStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../../components/icons/plus-icon';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';
import {UserAccount} from '../../../../models/user.model';

type Props = {
  setFilter: (filter: string) => void;
  account: UserAccount;
};

const ChatControlHeader: FC<Props> = ({setFilter, account}: Props) => {
  const classes = chatControlHeaderStyles();
  const {t} = useTranslation();
  const {showChatCreateDialog} = useChatDialogContext();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const openChatCreateDialog = (): void => {
    showChatCreateDialog(account);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleOnChange} fullWidth />
      <Fab className={classes.button} size="small" color="primary" onClick={openChatCreateDialog}>
        <PlusIcon />
      </Fab>
    </Box>
  );
};

export default ChatControlHeader;
