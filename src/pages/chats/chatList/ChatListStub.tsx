import React from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const ChatListStub = () => {
  const {t} = useTranslation();

  return <PageStub text={t('chat:list.chatsNotFound')} />;
};

export default ChatListStub;
