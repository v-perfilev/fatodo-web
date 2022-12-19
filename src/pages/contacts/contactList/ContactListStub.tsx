import React, {CSSProperties} from 'react';
import {HEADER_HEIGHT, PAGE_CONTROL_HEIGHT, PAGE_HEADER_HEIGHT, PAGE_MARGIN_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';
import {Typography} from '@mui/material';
import FVStack from '../../../components/boxes/FVStack';

const ContactListStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_CONTROL_HEIGHT * 2 - PAGE_MARGIN_HEIGHT;

  return (
    <PageStub height={height}>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-2.png'} />
        <Typography fontWeight="bold" fontSize="lg" color="lightgray">
          {t('contact:relations.relationsNotFound')}
        </Typography>
      </FVStack>
    </PageStub>
  );
};

const imgStyles: CSSProperties = {
  width: 150,
  height: 150,
  opacity: 0.8,
};

export default ContactListStub;
