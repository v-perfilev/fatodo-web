import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {AuthActions} from '../../../../store/auth/authActions';
import AuthSelectors from '../../../../store/auth/authSelectors';
import ModalDialog from '../../../../components/modals/ModalDialog';
import AccountDeleteDialogContent from './AccountDeleteDialogContent';

export type AccountDeleteDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultAccountDeleteDialogProps: Readonly<AccountDeleteDialogProps> = {
  show: false,
  close: () => null,
};

const AccountDeleteDialog = ({show, close}: AccountDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const request = (): void => {
    dispatch(AuthActions.deleteAccountPermanentlyThunk(account.id))
      .unwrap()
      .then(() => close());
  };

  const content = <AccountDeleteDialogContent account={account} request={request} cancel={close} />;

  return (
    <ModalDialog
      color="error"
      open={show}
      close={close}
      title={t('account:deletePermanently.title')}
      content={content}
    />
  );
};

export default memo(AccountDeleteDialog);
