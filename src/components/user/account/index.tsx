import React, {FC, useEffect} from 'react';
import withHeader from '../../../shared/hocs/with-header/with-header';
import {Container} from '@material-ui/core';
import {PageDivider, PageHeader} from '../../common/surfaces';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context/additional-menu-context';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useHistory} from 'react-router-dom';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import AccountForm from './account-form';
import {CircularSpinner} from '../../common/loaders';
import AccountPasswordForm from './account-password-form';
import {requestAccountData} from '../../../store/actions/auth.actions';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {flowRight} from 'lodash';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {requestAccountData};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Account: FC<Props> = ({authState, requestAccountData}: Props) => {
  const {account} = authState;
  const history = useHistory();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const additionalMenuItems = [
    {icon: <ArrowBackIcon />, action: redirectToPreviousLocation, tooltip: t('account:tooltips.back')},
  ];

  useEffect(() => {
    setMenu(additionalMenuItems);
  }, [i18n.language]);

  return account.id ? (
    <Container maxWidth="sm">
      <PageHeader title={t('account:account.title')} />
      <PageDivider height={5} />
      <AccountForm account={account} requestAccountData={requestAccountData} />
      {account.provider === 'LOCAL' && <AccountPasswordForm />}
    </Container>
  ) : (
    <CircularSpinner />
  );
};

export default flowRight([withHeader, withVerticalPadding, connector])(Account);
