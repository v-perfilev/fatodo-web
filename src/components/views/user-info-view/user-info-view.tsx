import React, {FC, HTMLAttributes} from 'react';
import {User} from '../../../models/user.model';
import {Grid} from '@material-ui/core';
import {UrlPic} from '../../images';
import {PageSubheader} from '../../surfaces';
import {userInfoViewStyles} from './_styles';
import csx from 'classnames';
import {UserInfoViewField} from './user-info-view-field';
import {useTranslation} from 'react-i18next';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {UserInfoViewButtons} from './user-info-view-buttons';
import {PopupContentComponentProps} from '../../surfaces/hover-popup/hover-popup-popper';

type Props = HTMLAttributes<HTMLElement> &
  PopupContentComponentProps &
  AuthState & {
    user: User;
  };

const UserInfoView: FC<Props> = ({user, account, className, closePopup}: Props) => {
  const classes = userInfoViewStyles();
  const {t} = useTranslation();

  const classNames = csx(classes.root, className);

  return (
    <Grid container className={classNames}>
      <Grid item xs={5} className={classes.imageItem}>
        <UrlPic alt={user.username} url={user.imageFilename} size="xl" border={2} />
      </Grid>
      <Grid item xs={7} className={classes.infoItem}>
        <PageSubheader title={user.username} />
        <UserInfoViewField
          label={t('account:fields.firstname.label')}
          text={user.firstname ?? t('account:info.fieldNotSet')}
        />
        <UserInfoViewField
          label={t('account:fields.lastname.label')}
          text={user.lastname ?? t('account:info.fieldNotSet')}
        />
      </Grid>
      {user.id !== account.id && (
        <Grid item xs={12} className={classes.buttonsItem}>
          <UserInfoViewButtons user={user} closePopup={closePopup} />
        </Grid>
      )}
    </Grid>
  );
};

export default withAuthState(UserInfoView);
