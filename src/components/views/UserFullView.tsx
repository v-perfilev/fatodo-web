import React, {useMemo} from 'react';
import {User} from '../../models/User';
import FVStack from '../boxes/FVStack';
import {useTranslation} from 'react-i18next';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../surfaces/MultiLabeledBox';
import UrlPic from '../images/UrlPic';
import {Typography} from '@mui/material';
import FHStack from '../boxes/FHStack';
import {UserUtils} from '../../shared/utils/UserUtils';

type UserFullViewProps = {
  user: User;
};

export const UserFullView = ({user}: UserFullViewProps) => {
  const {t, i18n} = useTranslation();

  const labeledItems = useMemo<MultiLabeledBoxItem[]>(
    () => [
      {label: t('account:fields.firstname.label'), value: user.firstname, showNotSet: true},
      {label: t('account:fields.lastname.label'), value: user.lastname, showNotSet: true},
    ],
    [user, i18n.language],
  );

  return (
    <FHStack>
      <UrlPic url={user.imageFilename} size={90} />
      <FVStack>
        <Typography fontSize={18} fontWeight="bold" color="primary">
          {UserUtils.getUsername(user, t)}
        </Typography>
        <MultiLabeledBox items={labeledItems} height={30} />
      </FVStack>
    </FHStack>
  );
};

export default UserFullView;
