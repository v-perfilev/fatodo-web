import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import withBackground from '../../../shared/hoc/with-background';
import {Routes} from '../../router';
import {useTranslation} from 'react-i18next';
import {authPageStyles} from '../common/_styles';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {LOADER_TIMEOUT} from '../../../constants';
import {Link} from '../../common/controls/link';
import ResetPasswordForm from './reset-password-form';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const ResetPassword: FC<Props> = ({authState: {isAuthenticated}}: Props) => {
  const classes = authPageStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const match = useRouteMatch<{code: string}>();
  const code = match.params.code;

  const redirectToHome = (): void => history.push(Routes.ROOT);
  const redirectToInternalError = (): void => history.push(Routes.INTERNAL_ERROR);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        {t('account:resetPassword.header')}
      </Typography>
      <Box m={1} />
      <ResetPasswordForm code={code} onSuccess={redirectToHome} onFailure={redirectToInternalError} />
      <Box m={2} />
      <Link to={Routes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Box>
  );
};

export default compose(withBackground('/images/background-1.jpg'), connector)(ResetPassword);