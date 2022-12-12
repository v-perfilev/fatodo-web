import React from 'react';
import {HEADER_HEIGHT, PAGE_HEADER_HEIGHT, PAGE_MARGIN_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const IncomingRequestListStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_MARGIN_HEIGHT;

  return <PageStub text={t('contact:incoming.requestsNotFound')} height={height} />;
};

export default IncomingRequestListStub;
