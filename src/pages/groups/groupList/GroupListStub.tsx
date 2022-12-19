import React, {CSSProperties, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';
import {Button} from '@mui/material';
import FVStack from '../../../components/boxes/FVStack';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {useNavigate} from 'react-router-dom';

const GroupListStub = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goToGroupCreate = useCallback(() => navigate(GroupRouteUtils.getCreateUrl()), []);

  return (
    <PageStub>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-1.png'} />
        <Button variant="contained" color="primary" onClick={goToGroupCreate}>
          {t('group:actions.createGroup')}
        </Button>
      </FVStack>
    </PageStub>
  );
};

const imgStyles: CSSProperties = {
  width: 150,
  height: 150,
  opacity: 0.8,
};

export default GroupListStub;
