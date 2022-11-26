import React from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const ChatViewStub = () => {
  const {t} = useTranslation();

  return <PageStub text={t('chat:view.messagesNotFound')} />;
};

export default ChatViewStub;
