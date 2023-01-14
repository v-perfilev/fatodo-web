import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {Typography} from '@mui/material';
import UserLink from '../../../../components/links/UserLink';

type GroupItemUserProps = {
  item: Item;
};

const GroupItemUser = ({item}: GroupItemUserProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  return (
    <Typography fontSize={10} color="grey.500" whiteSpace="nowrap">
      <UserLink user={user} />
    </Typography>
  );
};

export default GroupItemUser;
