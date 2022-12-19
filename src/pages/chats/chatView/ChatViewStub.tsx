import React, {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';
import FVStack from '../../../components/boxes/FVStack';
import {Typography} from '@mui/material';

const ChatViewStub = () => {
  const {t} = useTranslation();

  return (
    <PageStub>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-2.png'} />
        <Typography fontWeight="bold" fontSize="lg" color="lightgray">
          {t('chat:view.messagesNotFound')}
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

export default ChatViewStub;
