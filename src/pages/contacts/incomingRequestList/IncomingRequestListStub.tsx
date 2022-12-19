import React, {CSSProperties} from 'react';
import {HEADER_HEIGHT, PAGE_HEADER_HEIGHT, PAGE_MARGIN_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';
import FVStack from '../../../components/boxes/FVStack';
import {Typography} from '@mui/material';

const IncomingRequestListStub = () => {
  const {t} = useTranslation();
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_MARGIN_HEIGHT;

  return (
    <PageStub height={height}>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-2.png'} />
        <Typography fontWeight="bold" fontSize="lg" color="lightgray">
          {t('contact:incoming.requestsNotFound')}
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

export default IncomingRequestListStub;
