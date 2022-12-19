import React, {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../components/layouts/PageStub';
import FVStack from '../../components/boxes/FVStack';
import {Typography} from '@mui/material';

const ChatStub = () => {
  const {t} = useTranslation();

  return (
    <PageStub>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-3.png'} />
        <Typography fontWeight="bold" fontSize="lg" color="lightgray">
          {t('chat:common.chatNotSelected')}
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

export default ChatStub;
