import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';

const SocialLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {token} = useParams<{token: string}>();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);
  const redirectToInternalError = (): void => navigate(RootRoutes.INTERNAL_ERROR);

  useEffect(() => {
    if (token) {
      dispatch(AuthActions.socialLoginThunk(token))
        .unwrap()
        .then(() => redirectToHome())
        .catch(() => redirectToInternalError());
    } else {
      redirectToInternalError();
    }
  }, []);

  return <Box />;
};

export default SocialLogin;
