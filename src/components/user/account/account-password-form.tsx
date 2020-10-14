import React, {FC} from 'react';
import {accountStyles} from './_styles';
import {PageSubheader} from '../../common/surfaces/page-subheader';
import {PageDivider} from '../../common/surfaces/page-divider';


export const AccountPasswordForm: FC = () => {
  const classes = accountStyles();

  return (
    <>
      <PageSubheader title="Change password" />
      <PageDivider />
    </>
  );
};
