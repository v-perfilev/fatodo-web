import React, {FC, useEffect} from 'react';
import withHeader from '../../../shared/hocs/with-header/with-header';
import {Container} from '@material-ui/core';
import {PageDivider, PageHeader} from '../../../components/surfaces';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {ArrowBackIcon} from '../../../components/icons/arrow-back-icon';
import {useHistory} from 'react-router-dom';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import AccountForm from './account-form';
import {CircularSpinner} from '../../../components/loaders';
import AccountPasswordForm from './account-password-form';
import {requestAccountData} from '../../../store/actions/auth.actions';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {flowRight} from 'lodash';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';

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

  const menuElements = [
    {icon: <ArrowBackIcon />, action: redirectToPreviousLocation, text: t('account:tooltips.back')},
  ] as MenuElement[];

  useEffect(() => {
    setMenu(menuElements);
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
