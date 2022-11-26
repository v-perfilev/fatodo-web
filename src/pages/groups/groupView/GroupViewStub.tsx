import React from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const GroupViewStub = () => {
  const {t} = useTranslation();

  return <PageStub text={t('group:view.itemsNotFound')} />;
};

export default GroupViewStub;
