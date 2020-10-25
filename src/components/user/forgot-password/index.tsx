import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {compose} from 'recompose';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import ForgotPasswordForm from './forgot-password-form';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {authPageStyles} from '../common/_styles';
import {Routes} from '../../router';
import {LOADER_TIMEOUT} from '../../../constants';
import withBackground from '../../../shared/hoc/with-background';
import {Link} from '../../common/controls/link';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const ForgotPassword: FC<Props> = ({authState: {isAuthenticated}}: Props) => {
  const classes = authPageStyles();
  const history = useHistory();
  const {t} = useTranslation();

  const redirectToHome = (): void => history.push(Routes.ROOT);

  if (isAuthenticated) {
    setTimeout(() => redirectToHome(), LOADER_TIMEOUT);
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" color="primary">
        {t('account:forgotPassword.header')}
      </Typography>
      <Box m={1} />
      <ForgotPasswordForm onSuccess={redirectToHome} />
      <Box m={2} />
      <Link to={Routes.ROOT}>{t('buttons.toHomePage')}</Link>
    </Box>
  );
};

export default compose(withBackground('/images/background-1.jpg'), connector)(ForgotPassword);