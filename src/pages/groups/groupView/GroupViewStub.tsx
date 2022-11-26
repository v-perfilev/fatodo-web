import React from 'react';
import {HEADER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const GroupViewStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT;

  return <PageStub text={t('group:view.itemsNotFound')} height={height} />;
};

export default GroupViewStub;
