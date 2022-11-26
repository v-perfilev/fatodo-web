import React from 'react';
import {HEADER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const OutcomingRequestListStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT;

  return <PageStub text={t('contact:outcoming.requestsNotFound')} height={height} />;
};

export default OutcomingRequestListStub;
