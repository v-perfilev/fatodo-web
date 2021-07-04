import React, {FC, HTMLAttributes} from 'react';
import {User} from '../../../models/user.model';
import {Button, Grid} from '@material-ui/core';
import {UrlPic} from '../../images';
import {PageSubheader} from '../../surfaces';
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
      <Grid item xs={12} className={classes.buttonsItem}>
        <Button variant="contained" color="secondary">
          <MailIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
