import React, {FC, HTMLAttributes} from 'react';
import {User} from '../../../../models/user.model';
import {Button, Grid} from '@material-ui/core';
import {UrlPic} from '../../images/url-pic';
import {PageSubheader} from '../../surfaces/page-subheader';
import {userInfoViewStyles} from './_styles';
import csx from 'classnames';
import {UserInfoViewField} from './user-info-view-field';
import {useTranslation} from 'react-i18next';
import {MailIcon} from '../../icons/mail-icon';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
};

export const UserInfoView: FC<Props> = ({user, className}: Props) => {
  const classes = userInfoViewStyles();
  const classNames = csx(classes.root, className);
  const {t} = useTranslation();

  return (
    <Grid container className={classNames}>
      <Grid item xs={5} className={classes.imageItem}>
        <UrlPic alt={user.username} url={user.imageFilename} size="lg" border={2} />
      </Grid>
      <Grid item xs={7} className={classes.infoItem}>
        <PageSubheader title={user.username} />
        {user.firstname && <UserInfoViewField label={t('account:fields.firstname.label')} text={user.firstname} />}
        {user.lastname && <UserInfoViewField label={t('account:fields.lastname.label')} text={user.lastname} />}
      </Grid>
      <Grid item xs={12} className={classes.buttonsItem}>
        <Button variant="contained" color="secondary">
          <MailIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
