import React, {FC, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import {messageMainStyles} from './_styles';
import {Box, Grid, Theme, useMediaQuery} from '@material-ui/core';
import ChatControl from '../chat-control';
import ChatContent from '../chat-content';
import {Chat} from '../../../models/chat.model';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {useWsChatContext} from '../../../shared/contexts/chat-contexts/ws-chat-context';
import {useChatDialogContext} from '../../../shared/contexts/dialog-contexts/chat-dialog-context';
import ChatService from '../../../services/chat.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ChatRouteUtils} from '../_router';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {ArrowBackIcon} from '../../../components/icons/arrow-back-icon';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';

type Props = AuthState;

const ChatMain: FC<Props> = ({account}: Props) => {
  const classes = messageMainStyles();
  const history = useHistory();
  const {chatId} = useParams();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {selectChatIdForWs} = useWsChatContext();
  const {showChatCreateDialog} = useChatDialogContext();
  const [chat, setChat] = useState<Chat>();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const updateUrlChatParameter = (chat: Chat): void => {
    const url = chat ? ChatRouteUtils.getChatUrl(chat.id) : ChatRouteUtils.getRootUrl();
    history.replace(url);
  };

  const selectChat = (chat: Chat): void => {
    setChat(chat);
    selectChatIdForWs(chat?.id);
    updateUrlChatParameter(chat);
  };

  const closeChat = (): void => {
    selectChat(null);
  };

  const openChatCreateDialog = (): void => {
    showChatCreateDialog();
  };

  const loadChatFromRoute = (): void => {
    ChatService.getChatById(chatId)
      .then((response) => {
        const chat = response.data;
        selectChat(chat);
      })
      .catch(handleResponse);
  };

  const menuElements = [
    {icon: <PlusIcon />, action: openChatCreateDialog, text: t('chat:tooltips.createChat')},
    {icon: <ArrowBackIcon />, action: redirectToPreviousLocation, text: t('chat:tooltips.back')},
  ] as MenuElement[];

  useEffect(() => {
    if (chatId) {
      loadChatFromRoute();
    }
  }, []);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, showChatCreateDialog]);

  const bigView = (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={5} lg={4} xl={3} className={classes.control}>
        <ChatControl chat={chat} setChat={selectChat} account={account} />
      </Grid>
      <Grid item xs={7} lg={8} xl={9} className={classes.content}>
        <ChatContent chat={chat} closeChat={closeChat} account={account} />
      </Grid>
    </Grid>
  );

  const smallView = (
    <Box className={classes.smallViewRoot}>
      {chat ? (
        <ChatContent chat={chat} closeChat={closeChat} account={account} />
      ) : (
        <ChatControl chat={chat} setChat={selectChat} account={account} />
      )}
    </Box>
  );

  return <>{isBigDevice ? bigView : smallView}</>;
};

export default withAuthState(ChatMain);
