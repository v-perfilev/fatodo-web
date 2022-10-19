import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import DateView from '../../../../components/views/DateView';
import {Typography} from '@mui/material';

type GroupItemChangesProps = {
  item: Item;
};

const GroupItemChanges = ({item}: GroupItemChangesProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  const date = new Date(item.createdAt);

  return (
    <Typography fontSize={10} color="grey.500">
      {user?.username} / <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
    </Typography>
  );
};

export default GroupItemChanges;
