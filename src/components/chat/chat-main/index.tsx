import React, {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import {messageMainStyles} from './_styles';
import {Box, Grid, Theme, useMediaQuery} from '@material-ui/core';
import ChatControl from '../chat-control';
import ChatContent from '../chat-content';
import {Chat} from '../../../models/chat.model';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {compose} from 'recompose';
import {PlusIcon} from '../../common/icons/plus-icon';
import withAuthState from '../../../shared/hocs/with-auth-state';
import {useWsChatContext} from '../../../shared/contexts/chat-contexts/ws-chat-context';
import {useDialogsContext} from '../../../shared/contexts/dialogs-context';
import {ChatCreateDialogProps} from '../dialogs/chat-create-dialog';
import {ChatDialogs} from '../_router';

type Props = AuthState;

const ChatMain: FC<Props> = ({account}: Props) => {
  const classes = messageMainStyles();
  const history = useHistory();
  const {setDialogProps, clearDialogProps} = useDialogsContext();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {selectChat} = useWsChatContext();
  const [chat, setChat] = useState<Chat>();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const closeChat = (): void => {
    setChat(null);
  };

  const showChatCreateDialog = (): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.CREATE);
    const props = {show, close} as ChatCreateDialogProps;
    setDialogProps(ChatDialogs.CREATE, props);
  };

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={showChatCreateDialog}
        color="primary"
        tooltip={t('chat:tooltips.createChat')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('chat:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    selectChat(chat);
  }, [chat]);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const bigView = (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={4} className={classes.control}>
        <ChatControl chat={chat} setChat={setChat} account={account} />
      </Grid>
      <Grid item xs={8} className={classes.content}>
        <ChatContent chat={chat} closeChat={closeChat} account={account} />
      </Grid>
    </Grid>
  );

  const smallView = (
    <Box className={classes.smallViewRoot}>
      {chat ? (
        <ChatContent chat={chat} closeChat={closeChat} account={account} />
      ) : (
        <ChatControl chat={chat} setChat={setChat} account={account} />
      )}
    </Box>
  );

  return (
    <>
      {isBigDevice ? bigView : smallView}
    </>
  );
};

export default compose<Props, {}>(withAuthState)(ChatMain);
