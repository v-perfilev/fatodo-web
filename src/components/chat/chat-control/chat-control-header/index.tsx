import React, {ChangeEvent, FC} from 'react';
import {Box, Fab} from '@material-ui/core';
import {ClearableTextInput} from '../../../common/inputs';
import {chatControlHeaderStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../../common/icons/plus-icon';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';

type Props = {
  setFilter: (filter: string) => void;
};

const ChatControlHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = chatControlHeaderStyles();
  const {t} = useTranslation();
  const {showChatCreateDialog} = useChatDialogContext();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const openChatCreateDialog = (): void => {
    showChatCreateDialog();
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
