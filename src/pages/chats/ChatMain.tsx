import React from 'React';
import {Box, Grid, SxProps, useMediaQuery} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../store/store';
import ChatSelectors from '../../store/chat/chatSelectors';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {ChatActions} from '../../store/chat/chatActions';
import {Theme} from '@mui/material/styles';
import {HEADER_HEIGHT} from '../../constants';
import ChatList from './chatList/ChatList';
import {Chat} from '../../models/Chat';
import ChatView from './chatView/ChatView';
import {ChatRouteUtils} from '../../routes/ChatRouter';

const ChatMain = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(ChatSelectors.chat);
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const navigate = useNavigate();
  const {chatId} = useParams();

  const updateUrlChatParameter = (chat: Chat): void => {
    const url = chat ? ChatRouteUtils.getChatUrl(chat.id) : ChatRouteUtils.getRootUrl();
    navigate(url, {replace: true});
  };

  useEffect(() => {
    chat?.id !== chatId && chatId && dispatch(ChatActions.fetchChatThunk(chatId));
  }, [chatId]);

  useEffect(() => {
    updateUrlChatParameter(chat);
  }, [chat]);

  const bigView = (
    <Grid sx={bigViewStyles} container>
      <Grid sx={controlStyles} item xs={5} lg={4} xl={3}>
        <ChatList />
      </Grid>
      <Grid item xs={7} lg={8} xl={9}>
        <ChatView />
      </Grid>
    </Grid>
  );

  const smallView = (
    <Box sx={smallViewRootStyles}>
      {!chatId && <ChatList />}
      {chat && <ChatView />}
    </Box>
  );

  return <>{isBigDevice ? bigView : smallView}</>;
};

const bigViewStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
};

const smallViewRootStyles: SxProps = {
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

const controlStyles: SxProps = {
  borderRightWidth: 1,
  borderRightStyle: 'solid',
  borderRightColor: 'grey.300',
};

export default ChatMain;
