import React from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../components/layouts/PageStub';

const ChatStub = () => {
  const {t} = useTranslation();

  return <PageStub text={t('chat:common.chatNotSelected')} />;
};

export default ChatStub;
