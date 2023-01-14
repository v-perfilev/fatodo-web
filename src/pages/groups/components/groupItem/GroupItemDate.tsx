import React from 'react';
import {Item} from '../../../../models/Item';
import DateView from '../../../../components/views/DateView';
import {Typography} from '@mui/material';

type GroupItemDateProps = {
  item: Item;
};

const GroupItemDate = ({item}: GroupItemDateProps) => {
  const date = new Date(item.createdAt);

  return (
    <Typography fontSize={10} color="grey.500" whiteSpace="nowrap">
      <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
    </Typography>
  );
};

export default GroupItemDate;
