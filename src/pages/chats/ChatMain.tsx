import React, {useEffect} from 'react';
import {Box, Grid, SxProps, useMediaQuery} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../store/store';
import ChatSelectors from '../../store/chat/chatSelectors';
import {useNavigate, useParams} from 'react-router-dom';
import {ChatActions} from '../../store/chat/chatActions';
import {Theme} from '@mui/material/styles';
import {HEADER_HEIGHT} from '../../constants';
import ChatList from './chatList/ChatList';
import {Chat} from '../../models/Chat';
import ChatView from './chatView/ChatView';
import {ChatRouteUtils} from '../../routes/ChatRouter';
import PageContainer from '../../components/layouts/PageContainer';
import ChatStub from './ChatStub';

const ChatMain = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatLoading = useAppSelector(ChatSelectors.loading);
  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'), {noSsr: true});
  const navigate = useNavigate();
  const {chatId} = useParams();

  const updateUrlChatParameter = (chat: Chat): void => {
    const url = chat ? ChatRouteUtils.getChatUrl(chat.id) : ChatRouteUtils.getListUrl();
    navigate(url, {replace: true});
  };

  useEffect(() => {
    if (chat?.id !== chatId && chatId) {
      dispatch(ChatActions.fetchChatThunk(chatId));
    }
  }, [chatId]);

  useEffect(() => {
    updateUrlChatParameter(chat);
  }, [chat]);

  const bigView = (
    <Grid sx={bigViewRootStyles} container>
      <Grid sx={controlStyles} item xs={5} md={4} xl={3}>
        <PageContainer withoutContainer>
          <ChatList />
        </PageContainer>
      </Grid>
      <Grid item xs={7} md={8} xl={9}>
        <PageContainer withoutContainer>
          {(chat || chatLoading) && <ChatView />}
          {!chat && !chatLoading && <ChatStub />}
        </PageContainer>
      </Grid>
    </Grid>
  );

  const smallView = (
    <Box sx={smallViewRootStyles}>
      {!chatId && (
        <PageContainer withoutContainer>
          <ChatList />
        </PageContainer>
      )}
      {(chat || chatLoading) && (
        <PageContainer withoutContainer>
          <ChatView />
        </PageContainer>
      )}
    </Box>
  );

  return <>{isSmallDevice ? smallView : bigView}</>;
};

const bigViewRootStyles: SxProps = {
  position: 'relative',
  width: '100vw',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'hidden',
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
