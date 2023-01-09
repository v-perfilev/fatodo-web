import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import {SnackActions} from '../../../store/snack/snackActions';

const SocialLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectToHome = (): void => navigate(RootRoutes.ROOT);
  const redirectToInternalError = (): void => navigate(RootRoutes.INTERNAL_ERROR);

  useEffect(() => {
    if (searchParams.has('feedbackCode')) {
      const feedbackCode = searchParams.get('feedbackCode');
      dispatch(SnackActions.handleCode(feedbackCode, 'warning'));
      redirectToHome();
    } else if (searchParams.has('token')) {
      dispatch(AuthActions.socialLoginThunk(searchParams.get('token')))
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
