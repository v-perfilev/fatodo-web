import React from 'react';
import {HEADER_HEIGHT, PAGE_CONTROL_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';

const ContactListStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_CONTROL_HEIGHT * 2;

  return <PageStub text={t('contact:relations.relationsNotFound')} height={height} />;
};

export default ContactListStub;
