import React, {HTMLAttributes} from 'react';
import {User} from '../../../models/user.model';
import {Grid} from '@material-ui/core';
import csx from 'classnames';
import {useTranslation} from 'react-i18next';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {PopupContentComponentProps} from '../../surfaces/hoverPopup/HoverPopupPopper';
import {makeStyles, Theme} from '@material-ui/core/styles';
import UrlPic from '../../images/UrlPic';
import PageSubheader from '../../surfaces/PageSubheader';
import UserInfoViewField from './UserInfoViewField';
import UserInfoViewButtons from './UserInfoViewButtons';

type UserInfoViewProps = HTMLAttributes<HTMLElement> &
  PopupContentComponentProps &
  AuthState & {
    user: User;
  };

const UserInfoView = ({user, account, className, closePopup}: UserInfoViewProps) => {
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

const userInfoViewStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 300,
    height: 180,
  },
  imageItem: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(1.5),
  },
  infoItem: {
    paddingLeft: theme.spacing(0.5),
  },
  buttonsItem: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(0.5),
      height: 35,
    },
  },
}));

export default withAuthState(UserInfoView);
