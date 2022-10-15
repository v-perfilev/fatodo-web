import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import {Box} from '@mui/material';
import {AuthActions} from '../../../store/auth/authActions';
import {useAppDispatch} from '../../../store/store';

const Activation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {code} = useParams<{code: string}>();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);
  const redirectToInternalError = (): void => navigate(RootRoutes.INTERNAL_ERROR);

  useEffect(() => {
    dispatch(AuthActions.activateThunk(code))
      .unwrap()
      .then(() => redirectToHome())
      .catch(() => redirectToInternalError());
  }, []);

  return <Box />;
};

export default Activation;
