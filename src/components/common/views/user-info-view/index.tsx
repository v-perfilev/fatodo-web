import React, {FC, HTMLAttributes} from 'react';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {UrlPic} from '../../images/url-pic';
import {PageSubheader} from '../../surfaces/page-subheader';
import {userInfoViewStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
};

export const UserInfoView: FC<Props> = ({user, className}: Props) => {
  const classes = userInfoViewStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <PageSubheader title={user.username} />
      <UrlPic alt={user.username} url={user.imageFilename} size="lg" border={2} variant="square" />
    </Box>
  );
};
