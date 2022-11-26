import React from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const GroupListStub = () => {
  const {t} = useTranslation();

  return <PageStub text={t('group:list.groupsNotFound')} />;
};

export default GroupListStub;
