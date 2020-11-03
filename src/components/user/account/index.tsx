import React, {FC, useEffect} from 'react';
import withHeader from '../../../shared/hoc/with-header';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import {PageHeader} from '../../common/surfaces/page-header';
import {useTranslation} from 'react-i18next';
import {PageDivider} from '../../common/surfaces/page-divider';
import {accountStyles} from './_styles';
import withAdditionalMenu from '../../../shared/hoc/with-additional-menu';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useHistory} from 'react-router-dom';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import AccountForm from './account-form';
import {CircularSpinner} from '../../common/loaders/circular-spinner';
import AccountPasswordForm from './account-password-form';
import {requestAccountData} from '../../../store/actions/auth.actions';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {requestAccountData};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Account: FC<Props> = ({authState, requestAccountData}: Props) => {
  const classes = accountStyles();
  const {account} = authState;
  const history = useHistory();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="primary"
        tooltip={t('account:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return account.id ? (
    <Container className={classes.root} maxWidth="sm">
      <PageHeader title={t('account:account.title')} />
      <PageDivider height={5} />
      <AccountForm account={account} requestAccountData={requestAccountData} />
      {account.provider === 'LOCAL' && <AccountPasswordForm />}
    </Container>
  ) : (
    <CircularSpinner />
  );
};

export default compose(withHeader, withAdditionalMenu, connector)(Account);
