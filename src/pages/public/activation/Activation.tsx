import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import AuthService from '../../../services/AuthService';
import {Box} from '@mui/material';

const Activation = () => {
  const navigate = useNavigate();
  const {code} = useParams<{code: string}>();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);
  const redirectToInternalError = (): void => navigate(RootRoutes.INTERNAL_ERROR);

  useEffect(() => {
    AuthService.activate(code)
      .then(() => redirectToHome())
      .catch(() => redirectToInternalError());
  }, []);

  return <Box />;
};

export default Activation;
